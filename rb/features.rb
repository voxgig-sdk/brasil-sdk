# Brasil SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module BrasilFeatures
  def self.make_feature(name)
    case name
    when "base"
      BrasilBaseFeature.new
    when "ratelimit"
      BrasilRatelimitFeature.new
    when "retry"
      BrasilRetryFeature.new
    when "test"
      BrasilTestFeature.new
    when "timeout"
      BrasilTimeoutFeature.new
    else
      BrasilBaseFeature.new
    end
  end
end
