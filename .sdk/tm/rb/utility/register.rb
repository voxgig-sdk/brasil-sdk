# Brasil SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

BrasilUtility.registrar = ->(u) {
  u.clean = BrasilUtilities::Clean
  u.done = BrasilUtilities::Done
  u.make_error = BrasilUtilities::MakeError
  u.feature_add = BrasilUtilities::FeatureAdd
  u.feature_hook = BrasilUtilities::FeatureHook
  u.feature_init = BrasilUtilities::FeatureInit
  u.fetcher = BrasilUtilities::Fetcher
  u.make_fetch_def = BrasilUtilities::MakeFetchDef
  u.make_context = BrasilUtilities::MakeContext
  u.make_options = BrasilUtilities::MakeOptions
  u.make_request = BrasilUtilities::MakeRequest
  u.make_response = BrasilUtilities::MakeResponse
  u.make_result = BrasilUtilities::MakeResult
  u.make_point = BrasilUtilities::MakePoint
  u.make_spec = BrasilUtilities::MakeSpec
  u.make_url = BrasilUtilities::MakeUrl
  u.param = BrasilUtilities::Param
  u.prepare_auth = BrasilUtilities::PrepareAuth
  u.prepare_body = BrasilUtilities::PrepareBody
  u.prepare_headers = BrasilUtilities::PrepareHeaders
  u.prepare_method = BrasilUtilities::PrepareMethod
  u.prepare_params = BrasilUtilities::PrepareParams
  u.prepare_path = BrasilUtilities::PreparePath
  u.prepare_query = BrasilUtilities::PrepareQuery
  u.result_basic = BrasilUtilities::ResultBasic
  u.result_body = BrasilUtilities::ResultBody
  u.result_headers = BrasilUtilities::ResultHeaders
  u.transform_request = BrasilUtilities::TransformRequest
  u.transform_response = BrasilUtilities::TransformResponse
}
