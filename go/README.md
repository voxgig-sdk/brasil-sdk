# Brasil Golang SDK



The Golang SDK for the Brasil API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Bank(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/brasil-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/brasil-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/brasil-sdk/go=../brasil-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/brasil-sdk/go"
)

func main() {
    client := sdk.New()

    // List bank records — the value is the array of records itself.
    banks, err := client.Bank(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range banks.([]any) {
        fmt.Println(item)
    }

    // Load a single bank — the value is the loaded record.
    bank, err := client.Bank(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(bank)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
banks, err := client.Bank(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = banks
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

bank, err := client.Bank(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(bank) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewBrasilSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
BRASIL_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewBrasilSDK

```go
func NewBrasilSDK(options map[string]any) *BrasilSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *BrasilSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### BrasilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Bank` | `(data map[string]any) BrasilEntity` | Create a Bank entity instance. |
| `Cep` | `(data map[string]any) BrasilEntity` | Create a Cep entity instance. |
| `Cnpj` | `(data map[string]any) BrasilEntity` | Create a Cnpj entity instance. |
| `Ddd` | `(data map[string]any) BrasilEntity` | Create a Ddd entity instance. |
| `Feriado` | `(data map[string]any) BrasilEntity` | Create a Feriado entity instance. |
| `FipeMarca` | `(data map[string]any) BrasilEntity` | Create a FipeMarca entity instance. |
| `FipePreco` | `(data map[string]any) BrasilEntity` | Create a FipePreco entity instance. |
| `Municipio` | `(data map[string]any) BrasilEntity` | Create a Municipio entity instance. |
| `Ufn` | `(data map[string]any) BrasilEntity` | Create an Ufn entity instance. |
| `Ufn2` | `(data map[string]any) BrasilEntity` | Create an Ufn2 entity instance. |

### Entity interface (BrasilEntity)

All entities implement the `BrasilEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    bank, err := client.Bank(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // bank is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Bank

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"full_name"` |  |
| `"ispb"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/banks/v1`

#### Cep

| Field | Description |
| --- | --- |
| `"cep"` |  |
| `"city"` |  |
| `"location"` |  |
| `"neighborhood"` |  |
| `"service"` |  |
| `"state"` |  |
| `"street"` |  |

Operations: Load.

API path: `/cep/v1/{cep}`

#### Cnpj

| Field | Description |
| --- | --- |
| `"bairro"` |  |
| `"capital_social"` |  |
| `"cep"` |  |
| `"cnae_fiscal"` |  |
| `"cnae_fiscal_descricao"` |  |
| `"cnpj"` |  |
| `"complemento"` |  |
| `"data_inicio_atividade"` |  |
| `"ddd_telefone_1"` |  |
| `"logradouro"` |  |
| `"municipio"` |  |
| `"natureza_juridica"` |  |
| `"nome_fantasia"` |  |
| `"numero"` |  |
| `"porte"` |  |
| `"qsa"` |  |
| `"razao_social"` |  |
| `"uf"` |  |

Operations: Load.

API path: `/cnpj/v1/{cnpj}`

#### Ddd

| Field | Description |
| --- | --- |
| `"city"` |  |
| `"state"` |  |

Operations: Load.

API path: `/ddd/v1/{ddd}`

#### Feriado

| Field | Description |
| --- | --- |
| `"date"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: Load.

API path: `/feriados/v1/{ano}`

#### FipeMarca

| Field | Description |
| --- | --- |
| `"nome"` |  |
| `"valor"` |  |

Operations: Load.

API path: `/fipe/marcas/v1/{tipoVeiculo}`

#### FipePreco

| Field | Description |
| --- | --- |
| `"ano_modelo"` |  |
| `"codigo_fipe"` |  |
| `"combustivel"` |  |
| `"marca"` |  |
| `"mes_referencia"` |  |
| `"modelo"` |  |
| `"sigla_combustivel"` |  |
| `"tipo_veiculo"` |  |
| `"valor"` |  |

Operations: Load.

API path: `/fipe/preco/v1/{codigoFipe}`

#### Municipio

| Field | Description |
| --- | --- |
| `"codigo_ibge"` |  |
| `"nome"` |  |

Operations: Load.

API path: `/ibge/municipios/v1/{siglaUF}`

#### Ufn

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"nome"` |  |
| `"regiao"` |  |
| `"sigla"` |  |

Operations: List.

API path: `/ibge/uf/v1`

#### Ufn2

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"nome"` |  |
| `"regiao"` |  |
| `"sigla"` |  |

Operations: Load.

API path: `/ibge/uf/v1/{siglaUF}`



## Entities


### Bank

Create an instance: `bank := client.Bank(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `int` |  |
| `full_name` | `string` |  |
| `ispb` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```go
bank, err := client.Bank(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bank) // the loaded record
```

#### Example: List

```go
banks, err := client.Bank(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(banks) // the array of records
```


### Cep

Create an instance: `cep := client.Cep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cep` | `string` |  |
| `city` | `string` |  |
| `location` | `map[string]any` |  |
| `neighborhood` | `string` |  |
| `service` | `string` |  |
| `state` | `string` |  |
| `street` | `string` |  |

#### Example: Load

```go
cep, err := client.Cep(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cep) // the loaded record
```


### Cnpj

Create an instance: `cnpj := client.Cnpj(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bairro` | `string` |  |
| `capital_social` | `float64` |  |
| `cep` | `string` |  |
| `cnae_fiscal` | `int` |  |
| `cnae_fiscal_descricao` | `string` |  |
| `cnpj` | `string` |  |
| `complemento` | `string` |  |
| `data_inicio_atividade` | `string` |  |
| `ddd_telefone_1` | `string` |  |
| `logradouro` | `string` |  |
| `municipio` | `string` |  |
| `natureza_juridica` | `string` |  |
| `nome_fantasia` | `string` |  |
| `numero` | `string` |  |
| `porte` | `string` |  |
| `qsa` | `[]any` |  |
| `razao_social` | `string` |  |
| `uf` | `string` |  |

#### Example: Load

```go
cnpj, err := client.Cnpj(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cnpj) // the loaded record
```


### Ddd

Create an instance: `ddd := client.Ddd(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `[]any` |  |
| `state` | `string` |  |

#### Example: Load

```go
ddd, err := client.Ddd(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ddd) // the loaded record
```


### Feriado

Create an instance: `feriado := client.Feriado(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
feriado, err := client.Feriado(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(feriado) // the loaded record
```


### FipeMarca

Create an instance: `fipe_marca := client.FipeMarca(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `nome` | `string` |  |
| `valor` | `string` |  |

#### Example: Load

```go
fipe_marca, err := client.FipeMarca(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(fipe_marca) // the loaded record
```


### FipePreco

Create an instance: `fipe_preco := client.FipePreco(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ano_modelo` | `int` |  |
| `codigo_fipe` | `string` |  |
| `combustivel` | `string` |  |
| `marca` | `string` |  |
| `mes_referencia` | `string` |  |
| `modelo` | `string` |  |
| `sigla_combustivel` | `string` |  |
| `tipo_veiculo` | `int` |  |
| `valor` | `string` |  |

#### Example: Load

```go
fipe_preco, err := client.FipePreco(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(fipe_preco) // the loaded record
```


### Municipio

Create an instance: `municipio := client.Municipio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `codigo_ibge` | `string` |  |
| `nome` | `string` |  |

#### Example: Load

```go
municipio, err := client.Municipio(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(municipio) // the loaded record
```


### Ufn

Create an instance: `ufn := client.Ufn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `string` |  |
| `regiao` | `map[string]any` |  |
| `sigla` | `string` |  |

#### Example: List

```go
ufns, err := client.Ufn(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ufns) // the array of records
```


### Ufn2

Create an instance: `ufn2 := client.Ufn2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `string` |  |
| `regiao` | `map[string]any` |  |
| `sigla` | `string` |  |

#### Example: Load

```go
ufn2, err := client.Ufn2(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ufn2) // the loaded record
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/brasil-sdk/go/
├── brasil.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/brasil-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
bank := client.Bank(nil)
bank.List(nil, nil)

// bank.Data() now returns the bank data from the last list
// bank.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
