<?php
declare(strict_types=1);

// Brasil SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class BrasilFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BrasilBaseFeature();
            case "test":
                return new BrasilTestFeature();
            default:
                return new BrasilBaseFeature();
        }
    }
}
