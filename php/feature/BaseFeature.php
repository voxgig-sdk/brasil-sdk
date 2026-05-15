<?php
declare(strict_types=1);

// Brasil SDK base feature

class BrasilBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BrasilContext $ctx, array $options): void {}
    public function PostConstruct(BrasilContext $ctx): void {}
    public function PostConstructEntity(BrasilContext $ctx): void {}
    public function SetData(BrasilContext $ctx): void {}
    public function GetData(BrasilContext $ctx): void {}
    public function GetMatch(BrasilContext $ctx): void {}
    public function SetMatch(BrasilContext $ctx): void {}
    public function PrePoint(BrasilContext $ctx): void {}
    public function PreSpec(BrasilContext $ctx): void {}
    public function PreRequest(BrasilContext $ctx): void {}
    public function PreResponse(BrasilContext $ctx): void {}
    public function PreResult(BrasilContext $ctx): void {}
    public function PreDone(BrasilContext $ctx): void {}
    public function PreUnexpected(BrasilContext $ctx): void {}
}
