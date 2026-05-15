<?php
declare(strict_types=1);

// Brasil SDK utility: result_headers

class BrasilResultHeaders
{
    public static function call(BrasilContext $ctx): ?BrasilResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
