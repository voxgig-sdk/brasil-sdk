<?php
declare(strict_types=1);

// Brasil SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BrasilMakeContext
{
    public static function call(array $ctxmap, ?BrasilContext $basectx): BrasilContext
    {
        return new BrasilContext($ctxmap, $basectx);
    }
}
