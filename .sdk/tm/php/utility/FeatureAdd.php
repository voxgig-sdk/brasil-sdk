<?php
declare(strict_types=1);

// Brasil SDK utility: feature_add

class BrasilFeatureAdd
{
    public static function call(BrasilContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
