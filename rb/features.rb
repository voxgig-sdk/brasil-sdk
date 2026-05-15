# Brasil SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module BrasilFeatures
  def self.make_feature(name)
    case name
    when "base"
      BrasilBaseFeature.new
    when "test"
      BrasilTestFeature.new
    else
      BrasilBaseFeature.new
    end
  end
end
