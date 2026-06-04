package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/brasil-sdk/go"
	"github.com/voxgig-sdk/brasil-sdk/go/core"

	vs "github.com/voxgig-sdk/brasil-sdk/go/utility/struct"
)

func TestUfn2Entity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Ufn2(nil)
		if ent == nil {
			t.Fatal("expected non-nil Ufn2Entity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ufn2BasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ufn2." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set BRASIL_TEST_UFN__ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		ufn2Ref01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.ufn2", setup.data)))
		var ufn2Ref01Data map[string]any
		if len(ufn2Ref01DataRaw) > 0 {
			ufn2Ref01Data = core.ToMapAny(ufn2Ref01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = ufn2Ref01Data

		// LOAD
		ufn2Ref01Ent := client.Ufn2(nil)
		ufn2Ref01MatchDt0 := map[string]any{
			"id": ufn2Ref01Data["id"],
		}
		ufn2Ref01DataDt0Loaded, err := ufn2Ref01Ent.Load(ufn2Ref01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		ufn2Ref01DataDt0LoadResult := core.ToMapAny(ufn2Ref01DataDt0Loaded)
		if ufn2Ref01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if ufn2Ref01DataDt0LoadResult["id"] != ufn2Ref01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func ufn2BasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ufn2", "Ufn2TestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ufn2 test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ufn2 test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ufn201", "ufn202", "ufn203", "v101", "v102", "v103"},
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
	entidEnvRaw := os.Getenv("BRASIL_TEST_UFN__ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"BRASIL_TEST_UFN__ENTID": idmap,
		"BRASIL_TEST_LIVE":      "FALSE",
		"BRASIL_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["BRASIL_TEST_UFN__ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["BRASIL_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
