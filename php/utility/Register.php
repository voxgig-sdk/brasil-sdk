<?php
declare(strict_types=1);

// Brasil SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

BrasilUtility::setRegistrar(function (BrasilUtility $u): void {
    $u->clean = [BrasilClean::class, 'call'];
    $u->done = [BrasilDone::class, 'call'];
    $u->make_error = [BrasilMakeError::class, 'call'];
    $u->feature_add = [BrasilFeatureAdd::class, 'call'];
    $u->feature_hook = [BrasilFeatureHook::class, 'call'];
    $u->feature_init = [BrasilFeatureInit::class, 'call'];
    $u->fetcher = [BrasilFetcher::class, 'call'];
    $u->make_fetch_def = [BrasilMakeFetchDef::class, 'call'];
    $u->make_context = [BrasilMakeContext::class, 'call'];
    $u->make_options = [BrasilMakeOptions::class, 'call'];
    $u->make_request = [BrasilMakeRequest::class, 'call'];
    $u->make_response = [BrasilMakeResponse::class, 'call'];
    $u->make_result = [BrasilMakeResult::class, 'call'];
    $u->make_point = [BrasilMakePoint::class, 'call'];
    $u->make_spec = [BrasilMakeSpec::class, 'call'];
    $u->make_url = [BrasilMakeUrl::class, 'call'];
    $u->param = [BrasilParam::class, 'call'];
    $u->prepare_auth = [BrasilPrepareAuth::class, 'call'];
    $u->prepare_body = [BrasilPrepareBody::class, 'call'];
    $u->prepare_headers = [BrasilPrepareHeaders::class, 'call'];
    $u->prepare_method = [BrasilPrepareMethod::class, 'call'];
    $u->prepare_params = [BrasilPrepareParams::class, 'call'];
    $u->prepare_path = [BrasilPreparePath::class, 'call'];
    $u->prepare_query = [BrasilPrepareQuery::class, 'call'];
    $u->result_basic = [BrasilResultBasic::class, 'call'];
    $u->result_body = [BrasilResultBody::class, 'call'];
    $u->result_headers = [BrasilResultHeaders::class, 'call'];
    $u->transform_request = [BrasilTransformRequest::class, 'call'];
    $u->transform_response = [BrasilTransformResponse::class, 'call'];
});
