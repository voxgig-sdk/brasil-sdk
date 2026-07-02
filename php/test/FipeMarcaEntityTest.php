<?php
declare(strict_types=1);

// FipeMarca entity test

require_once __DIR__ . '/../brasil_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class FipeMarcaEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = BrasilSDK::test(null, null);
        $ent = $testsdk->FipeMarca(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = fipe_marca_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "fipe_marca." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set BRASIL_TEST_FIPE_MARCA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $fipe_marca_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.fipe_marca")));
        $fipe_marca_ref01_data = null;
        if (count($fipe_marca_ref01_data_raw) > 0) {
            $fipe_marca_ref01_data = Helpers::to_map($fipe_marca_ref01_data_raw[0][1]);
        }

        // LOAD
        $fipe_marca_ref01_ent = $client->FipeMarca(null);
        $fipe_marca_ref01_match_dt0 = [];
        [$fipe_marca_ref01_data_dt0_loaded, $err] = $fipe_marca_ref01_ent->load($fipe_marca_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($fipe_marca_ref01_data_dt0_loaded);

    }
}

function fipe_marca_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/fipe_marca/FipeMarcaTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = BrasilSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["fipe_marca01", "fipe_marca02", "fipe_marca03", "v101", "v102", "v103"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("BRASIL_TEST_FIPE_MARCA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "BRASIL_TEST_FIPE_MARCA_ENTID" => $idmap,
        "BRASIL_TEST_LIVE" => "FALSE",
        "BRASIL_TEST_EXPLAIN" => "FALSE",
        "BRASIL_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["BRASIL_TEST_FIPE_MARCA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["BRASIL_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["BRASIL_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new BrasilSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["BRASIL_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["BRASIL_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
