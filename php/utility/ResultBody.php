<?php
declare(strict_types=1);

// Brasil SDK utility: result_body

class BrasilResultBody
{
    public static function call(BrasilContext $ctx): ?BrasilResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
