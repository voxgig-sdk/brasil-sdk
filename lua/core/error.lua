-- Brasil SDK error

local BrasilError = {}
BrasilError.__index = BrasilError


function BrasilError.new(code, msg, ctx)
  local self = setmetatable({}, BrasilError)
  self.is_sdk_error = true
  self.sdk = "Brasil"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BrasilError:error()
  return self.msg
end


function BrasilError:__tostring()
  return self.msg
end


return BrasilError
