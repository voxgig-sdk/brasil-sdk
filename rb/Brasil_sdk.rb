# Brasil SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Brasil_types'


class BrasilSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = BrasilUtility.new
    @_utility = utility

    config = BrasilConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = BrasilHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = BrasilHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, BrasilFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    BrasilUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = BrasilHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = BrasilHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = BrasilHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = BrasilSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue BrasilError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = BrasilHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = BrasilHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.bank.list / client.bank.load({ "id" => ... })
  def bank
    require_relative 'entity/bank_entity'
    @bank ||= BankEntity.new(self, nil)
  end

  # Deprecated: use client.bank instead.
  def Bank(data = nil)
    require_relative 'entity/bank_entity'
    BankEntity.new(self, data)
  end


  # Idiomatic facade: client.cep.list / client.cep.load({ "id" => ... })
  def cep
    require_relative 'entity/cep_entity'
    @cep ||= CepEntity.new(self, nil)
  end

  # Deprecated: use client.cep instead.
  def Cep(data = nil)
    require_relative 'entity/cep_entity'
    CepEntity.new(self, data)
  end


  # Idiomatic facade: client.cnpj.list / client.cnpj.load({ "id" => ... })
  def cnpj
    require_relative 'entity/cnpj_entity'
    @cnpj ||= CnpjEntity.new(self, nil)
  end

  # Deprecated: use client.cnpj instead.
  def Cnpj(data = nil)
    require_relative 'entity/cnpj_entity'
    CnpjEntity.new(self, data)
  end


  # Idiomatic facade: client.ddd.list / client.ddd.load({ "id" => ... })
  def ddd
    require_relative 'entity/ddd_entity'
    @ddd ||= DddEntity.new(self, nil)
  end

  # Deprecated: use client.ddd instead.
  def Ddd(data = nil)
    require_relative 'entity/ddd_entity'
    DddEntity.new(self, data)
  end


  # Idiomatic facade: client.feriado.list / client.feriado.load({ "id" => ... })
  def feriado
    require_relative 'entity/feriado_entity'
    @feriado ||= FeriadoEntity.new(self, nil)
  end

  # Deprecated: use client.feriado instead.
  def Feriado(data = nil)
    require_relative 'entity/feriado_entity'
    FeriadoEntity.new(self, data)
  end


  # Idiomatic facade: client.fipe_marca.list / client.fipe_marca.load({ "id" => ... })
  def fipe_marca
    require_relative 'entity/fipe_marca_entity'
    @fipe_marca ||= FipeMarcaEntity.new(self, nil)
  end

  # Deprecated: use client.fipe_marca instead.
  def FipeMarca(data = nil)
    require_relative 'entity/fipe_marca_entity'
    FipeMarcaEntity.new(self, data)
  end


  # Idiomatic facade: client.fipe_preco.list / client.fipe_preco.load({ "id" => ... })
  def fipe_preco
    require_relative 'entity/fipe_preco_entity'
    @fipe_preco ||= FipePrecoEntity.new(self, nil)
  end

  # Deprecated: use client.fipe_preco instead.
  def FipePreco(data = nil)
    require_relative 'entity/fipe_preco_entity'
    FipePrecoEntity.new(self, data)
  end


  # Idiomatic facade: client.municipio.list / client.municipio.load({ "id" => ... })
  def municipio
    require_relative 'entity/municipio_entity'
    @municipio ||= MunicipioEntity.new(self, nil)
  end

  # Deprecated: use client.municipio instead.
  def Municipio(data = nil)
    require_relative 'entity/municipio_entity'
    MunicipioEntity.new(self, data)
  end


  # Idiomatic facade: client.ufn.list / client.ufn.load({ "id" => ... })
  def ufn
    require_relative 'entity/ufn_entity'
    @ufn ||= UfnEntity.new(self, nil)
  end

  # Deprecated: use client.ufn instead.
  def Ufn(data = nil)
    require_relative 'entity/ufn_entity'
    UfnEntity.new(self, data)
  end


  # Idiomatic facade: client.ufn2.list / client.ufn2.load({ "id" => ... })
  def ufn2
    require_relative 'entity/ufn2_entity'
    @ufn2 ||= Ufn2Entity.new(self, nil)
  end

  # Deprecated: use client.ufn2 instead.
  def Ufn2(data = nil)
    require_relative 'entity/ufn2_entity'
    Ufn2Entity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = BrasilSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
