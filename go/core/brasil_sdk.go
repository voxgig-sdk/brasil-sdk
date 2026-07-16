package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/brasil-sdk/go/utility/struct"
)

type BrasilSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewBrasilSDK(options map[string]any) *BrasilSDK {
	sdk := &BrasilSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *BrasilSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *BrasilSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *BrasilSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *BrasilSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *BrasilSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Bank returns a Bank entity bound to this client.
// Idiomatic usage: client.Bank(nil).List(nil, nil) or
// client.Bank(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Bank(data map[string]any) BrasilEntity {
	return NewBankEntityFunc(sdk, data)
}


// Cep returns a Cep entity bound to this client.
// Idiomatic usage: client.Cep(nil).List(nil, nil) or
// client.Cep(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Cep(data map[string]any) BrasilEntity {
	return NewCepEntityFunc(sdk, data)
}


// Cnpj returns a Cnpj entity bound to this client.
// Idiomatic usage: client.Cnpj(nil).List(nil, nil) or
// client.Cnpj(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Cnpj(data map[string]any) BrasilEntity {
	return NewCnpjEntityFunc(sdk, data)
}


// Ddd returns a Ddd entity bound to this client.
// Idiomatic usage: client.Ddd(nil).List(nil, nil) or
// client.Ddd(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Ddd(data map[string]any) BrasilEntity {
	return NewDddEntityFunc(sdk, data)
}


// Feriado returns a Feriado entity bound to this client.
// Idiomatic usage: client.Feriado(nil).List(nil, nil) or
// client.Feriado(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Feriado(data map[string]any) BrasilEntity {
	return NewFeriadoEntityFunc(sdk, data)
}


// FipeMarca returns a FipeMarca entity bound to this client.
// Idiomatic usage: client.FipeMarca(nil).List(nil, nil) or
// client.FipeMarca(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) FipeMarca(data map[string]any) BrasilEntity {
	return NewFipeMarcaEntityFunc(sdk, data)
}


// FipePreco returns a FipePreco entity bound to this client.
// Idiomatic usage: client.FipePreco(nil).List(nil, nil) or
// client.FipePreco(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) FipePreco(data map[string]any) BrasilEntity {
	return NewFipePrecoEntityFunc(sdk, data)
}


// Municipio returns a Municipio entity bound to this client.
// Idiomatic usage: client.Municipio(nil).List(nil, nil) or
// client.Municipio(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Municipio(data map[string]any) BrasilEntity {
	return NewMunicipioEntityFunc(sdk, data)
}


// Ufn returns a Ufn entity bound to this client.
// Idiomatic usage: client.Ufn(nil).List(nil, nil) or
// client.Ufn(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Ufn(data map[string]any) BrasilEntity {
	return NewUfnEntityFunc(sdk, data)
}


// Ufn2 returns a Ufn2 entity bound to this client.
// Idiomatic usage: client.Ufn2(nil).List(nil, nil) or
// client.Ufn2(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *BrasilSDK) Ufn2(data map[string]any) BrasilEntity {
	return NewUfn2EntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *BrasilSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewBrasilSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
