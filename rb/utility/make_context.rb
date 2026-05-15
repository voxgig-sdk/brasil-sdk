# Brasil SDK utility: make_context
require_relative '../core/context'
module BrasilUtilities
  MakeContext = ->(ctxmap, basectx) {
    BrasilContext.new(ctxmap, basectx)
  }
end
