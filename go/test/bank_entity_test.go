package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/brasil-sdk"
	"github.com/voxgig-sdk/brasil-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBankEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Bank(nil)
		if ent == nil {
			t.Fatal("expected non-nil BankEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := bankBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bank." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set BRASIL_TEST_BANK_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		bankRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.bank", setup.data)))
		var bankRef01Data map[string]any
		if len(bankRef01DataRaw) > 0 {
			bankRef01Data = core.ToMapAny(bankRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bankRef01Data

		// LIST
		bankRef01Ent := client.Bank(nil)
		bankRef01Match := map[string]any{}

		bankRef01ListResult, err := bankRef01Ent.List(bankRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, bankRef01ListOk := bankRef01ListResult.([]any)
		if !bankRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bankRef01ListResult)
		}

		// LOAD
		bankRef01MatchDt0 := map[string]any{}
		bankRef01DataDt0Loaded, err := bankRef01Ent.Load(bankRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if bankRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func bankBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bank", "BankTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bank test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bank test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"bank01", "bank02", "bank03", "v101", "v102", "v103"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("BRASIL_TEST_BANK_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BRASIL_TEST_BANK_ENTID": idmap,
		"BRASIL_TEST_LIVE":      "FALSE",
		"BRASIL_TEST_EXPLAIN":   "FALSE",
		"BRASIL_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["BRASIL_TEST_BANK_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["BRASIL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["BRASIL_APIKEY"],
			},
			extra,
		})
		client = sdk.NewBrasilSDK(core.ToMapAny(mergedOpts))
	}

	live := env["BRASIL_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["BRASIL_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
