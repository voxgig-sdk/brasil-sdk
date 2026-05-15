# Brasil SDK exists test

require "minitest/autorun"
require_relative "../Brasil_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = BrasilSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
