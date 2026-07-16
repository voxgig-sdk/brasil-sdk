-- Brasil SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local BrasilSDK = {}
BrasilSDK.__index = BrasilSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

BrasilSDK._make_feature = _make_feature


function BrasilSDK.new(options)
  local self = setmetatable({}, BrasilSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function BrasilSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function BrasilSDK:get_utility()
  return Utility.copy(self._utility)
end


function BrasilSDK:get_root_ctx()
  return self._rootctx
end


function BrasilSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function BrasilSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Bank():list() / client:Bank():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Bank(data)
  local EntityMod = require("entity.bank_entity")
  if data == nil then
    if self._bank == nil then
      self._bank = EntityMod.new(self, nil)
    end
    return self._bank
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Cep():list() / client:Cep():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Cep(data)
  local EntityMod = require("entity.cep_entity")
  if data == nil then
    if self._cep == nil then
      self._cep = EntityMod.new(self, nil)
    end
    return self._cep
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Cnpj():list() / client:Cnpj():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Cnpj(data)
  local EntityMod = require("entity.cnpj_entity")
  if data == nil then
    if self._cnpj == nil then
      self._cnpj = EntityMod.new(self, nil)
    end
    return self._cnpj
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Ddd():list() / client:Ddd():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Ddd(data)
  local EntityMod = require("entity.ddd_entity")
  if data == nil then
    if self._ddd == nil then
      self._ddd = EntityMod.new(self, nil)
    end
    return self._ddd
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Feriado():list() / client:Feriado():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Feriado(data)
  local EntityMod = require("entity.feriado_entity")
  if data == nil then
    if self._feriado == nil then
      self._feriado = EntityMod.new(self, nil)
    end
    return self._feriado
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FipeMarca():list() / client:FipeMarca():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:FipeMarca(data)
  local EntityMod = require("entity.fipe_marca_entity")
  if data == nil then
    if self._fipe_marca == nil then
      self._fipe_marca = EntityMod.new(self, nil)
    end
    return self._fipe_marca
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FipePreco():list() / client:FipePreco():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:FipePreco(data)
  local EntityMod = require("entity.fipe_preco_entity")
  if data == nil then
    if self._fipe_preco == nil then
      self._fipe_preco = EntityMod.new(self, nil)
    end
    return self._fipe_preco
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Municipio():list() / client:Municipio():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Municipio(data)
  local EntityMod = require("entity.municipio_entity")
  if data == nil then
    if self._municipio == nil then
      self._municipio = EntityMod.new(self, nil)
    end
    return self._municipio
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Ufn():list() / client:Ufn():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Ufn(data)
  local EntityMod = require("entity.ufn_entity")
  if data == nil then
    if self._ufn == nil then
      self._ufn = EntityMod.new(self, nil)
    end
    return self._ufn
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Ufn2():list() / client:Ufn2():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function BrasilSDK:Ufn2(data)
  local EntityMod = require("entity.ufn2_entity")
  if data == nil then
    if self._ufn2 == nil then
      self._ufn2 = EntityMod.new(self, nil)
    end
    return self._ufn2
  end
  return EntityMod.new(self, data)
end




function BrasilSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = BrasilSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return BrasilSDK
