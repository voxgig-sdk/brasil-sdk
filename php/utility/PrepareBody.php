<?php
declare(strict_types=1);

// Brasil SDK utility: prepare_body

class BrasilPrepareBody
{
    public static function call(BrasilContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
