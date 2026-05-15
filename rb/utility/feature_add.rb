# Brasil SDK utility: feature_add
module BrasilUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
