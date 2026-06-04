# Municipio entity test

require "minitest/autorun"
require "json"
require_relative "../Brasil_sdk"
require_relative "runner"

class MunicipioEntityTest < Minitest::Test
  def test_create_instance
    testsdk = BrasilSDK.test(nil, nil)
    ent = testsdk.Municipio(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = municipio_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "municipio." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set BRASIL_TEST_MUNICIPIO_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    municipio_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.municipio")))
    municipio_ref01_data = nil
    if municipio_ref01_data_raw.length > 0
      municipio_ref01_data = Helpers.to_map(municipio_ref01_data_raw[0][1])
    end

    # LOAD
    municipio_ref01_ent = client.Municipio(nil)
    municipio_ref01_match_dt0 = {}
    municipio_ref01_data_dt0_loaded, err = municipio_ref01_ent.load(municipio_ref01_match_dt0, nil)
    assert_nil err
    assert !municipio_ref01_data_dt0_loaded.nil?

  end
end

def municipio_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "municipio", "MunicipioTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = BrasilSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["municipio01", "municipio02", "municipio03", "v101", "v102", "v103"],
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
  entid_env_raw = ENV["BRASIL_TEST_MUNICIPIO_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "BRASIL_TEST_MUNICIPIO_ENTID" => idmap,
    "BRASIL_TEST_LIVE" => "FALSE",
    "BRASIL_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["BRASIL_TEST_MUNICIPIO_ENTID"])
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
