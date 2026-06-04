# Ufn2 entity test

require "minitest/autorun"
require "json"
require_relative "../Brasil_sdk"
require_relative "runner"

class Ufn2EntityTest < Minitest::Test
  def test_create_instance
    testsdk = BrasilSDK.test(nil, nil)
    ent = testsdk.Ufn2(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = ufn2_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "ufn2." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set BRASIL_TEST_UFN__ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    ufn2_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.ufn2")))
    ufn2_ref01_data = nil
    if ufn2_ref01_data_raw.length > 0
      ufn2_ref01_data = Helpers.to_map(ufn2_ref01_data_raw[0][1])
    end

    # LOAD
    ufn2_ref01_ent = client.Ufn2(nil)
    ufn2_ref01_match_dt0 = {
      "id" => ufn2_ref01_data["id"],
    }
    ufn2_ref01_data_dt0_loaded, err = ufn2_ref01_ent.load(ufn2_ref01_match_dt0, nil)
    assert_nil err
    ufn2_ref01_data_dt0_load_result = Helpers.to_map(ufn2_ref01_data_dt0_loaded)
    assert !ufn2_ref01_data_dt0_load_result.nil?
    assert_equal ufn2_ref01_data_dt0_load_result["id"], ufn2_ref01_data["id"]

  end
end

def ufn2_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "ufn2", "Ufn2TestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = BrasilSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["ufn201", "ufn202", "ufn203", "v101", "v102", "v103"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["BRASIL_TEST_UFN__ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "BRASIL_TEST_UFN__ENTID" => idmap,
    "BRASIL_TEST_LIVE" => "FALSE",
    "BRASIL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["BRASIL_TEST_UFN__ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["BRASIL_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = BrasilSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["BRASIL_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["BRASIL_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
