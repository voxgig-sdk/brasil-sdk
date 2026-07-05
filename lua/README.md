# Brasil Lua SDK



The Lua SDK for the Brasil API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Bank()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/brasil-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("brasil_sdk")

local client = sdk.new()
```

### 2. List bank records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local banks, err = client:Bank():list()
if err then error(err) end

for _, item in ipairs(banks) do
  print(item["full_name"])
end
```

### 3. Load a bank

```lua
local bank, err = client:Bank():load()
if err then error(err) end
print(bank)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local banks, err = client:Bank():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Bank():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### BrasilSDK

```lua
local sdk = require("brasil_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### BrasilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Bank` | `(data) -> BankEntity` | Create a Bank entity instance. |
| `Cep` | `(data) -> CepEntity` | Create a Cep entity instance. |
| `Cnpj` | `(data) -> CnpjEntity` | Create a Cnpj entity instance. |
| `Ddd` | `(data) -> DddEntity` | Create a Ddd entity instance. |
| `Feriado` | `(data) -> FeriadoEntity` | Create a Feriado entity instance. |
| `FipeMarca` | `(data) -> FipeMarcaEntity` | Create a FipeMarca entity instance. |
| `FipePreco` | `(data) -> FipePrecoEntity` | Create a FipePreco entity instance. |
| `Municipio` | `(data) -> MunicipioEntity` | Create a Municipio entity instance. |
| `Ufn` | `(data) -> UfnEntity` | Create an Ufn entity instance. |
| `Ufn2` | `(data) -> Ufn2Entity` | Create an Ufn2 entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local bank, err = client:Bank():load()
    if err then error(err) end
    -- bank is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Bank

| Field | Description |
| --- | --- |
| `code` |  |
| `full_name` |  |
| `ispb` |  |
| `name` |  |

Operations: List, Load.

API path: `/banks/v1`

#### Cep

| Field | Description |
| --- | --- |
| `cep` |  |
| `city` |  |
| `location` |  |
| `neighborhood` |  |
| `service` |  |
| `state` |  |
| `street` |  |

Operations: Load.

API path: `/cep/v1/{cep}`

#### Cnpj

| Field | Description |
| --- | --- |
| `bairro` |  |
| `capital_social` |  |
| `cep` |  |
| `cnae_fiscal` |  |
| `cnae_fiscal_descricao` |  |
| `cnpj` |  |
| `complemento` |  |
| `data_inicio_atividade` |  |
| `ddd_telefone_1` |  |
| `logradouro` |  |
| `municipio` |  |
| `natureza_juridica` |  |
| `nome_fantasia` |  |
| `numero` |  |
| `porte` |  |
| `qsa` |  |
| `razao_social` |  |
| `uf` |  |

Operations: Load.

API path: `/cnpj/v1/{cnpj}`

#### Ddd

| Field | Description |
| --- | --- |
| `city` |  |
| `state` |  |

Operations: Load.

API path: `/ddd/v1/{ddd}`

#### Feriado

| Field | Description |
| --- | --- |
| `date` |  |
| `name` |  |
| `type` |  |

Operations: Load.

API path: `/feriados/v1/{ano}`

#### FipeMarca

| Field | Description |
| --- | --- |
| `nome` |  |
| `valor` |  |

Operations: Load.

API path: `/fipe/marcas/v1/{tipoVeiculo}`

#### FipePreco

| Field | Description |
| --- | --- |
| `ano_modelo` |  |
| `codigo_fipe` |  |
| `combustivel` |  |
| `marca` |  |
| `mes_referencia` |  |
| `modelo` |  |
| `sigla_combustivel` |  |
| `tipo_veiculo` |  |
| `valor` |  |

Operations: Load.

API path: `/fipe/preco/v1/{codigoFipe}`

#### Municipio

| Field | Description |
| --- | --- |
| `codigo_ibge` |  |
| `nome` |  |

Operations: Load.

API path: `/ibge/municipios/v1/{siglaUF}`

#### Ufn

| Field | Description |
| --- | --- |
| `id` |  |
| `nome` |  |
| `regiao` |  |
| `sigla` |  |

Operations: List.

API path: `/ibge/uf/v1`

#### Ufn2

| Field | Description |
| --- | --- |
| `id` |  |
| `nome` |  |
| `regiao` |  |
| `sigla` |  |

Operations: Load.

API path: `/ibge/uf/v1/{siglaUF}`



## Entities


### Bank

Create an instance: `local bank = client:Bank(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `number` |  |
| `full_name` | `string` |  |
| `ispb` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```lua
local bank, err = client:Bank():load()
```

#### Example: List

```lua
local banks, err = client:Bank():list()
```


### Cep

Create an instance: `local cep = client:Cep(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cep` | `string` |  |
| `city` | `string` |  |
| `location` | `table` |  |
| `neighborhood` | `string` |  |
| `service` | `string` |  |
| `state` | `string` |  |
| `street` | `string` |  |

#### Example: Load

```lua
local cep, err = client:Cep():load()
```


### Cnpj

Create an instance: `local cnpj = client:Cnpj(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bairro` | `string` |  |
| `capital_social` | `number` |  |
| `cep` | `string` |  |
| `cnae_fiscal` | `number` |  |
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
| `qsa` | `table` |  |
| `razao_social` | `string` |  |
| `uf` | `string` |  |

#### Example: Load

```lua
local cnpj, err = client:Cnpj():load()
```


### Ddd

Create an instance: `local ddd = client:Ddd(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `table` |  |
| `state` | `string` |  |

#### Example: Load

```lua
local ddd, err = client:Ddd():load()
```


### Feriado

Create an instance: `local feriado = client:Feriado(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```lua
local feriado, err = client:Feriado():load()
```


### FipeMarca

Create an instance: `local fipe_marca = client:FipeMarca(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `nome` | `string` |  |
| `valor` | `string` |  |

#### Example: Load

```lua
local fipe_marca, err = client:FipeMarca():load()
```


### FipePreco

Create an instance: `local fipe_preco = client:FipePreco(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ano_modelo` | `number` |  |
| `codigo_fipe` | `string` |  |
| `combustivel` | `string` |  |
| `marca` | `string` |  |
| `mes_referencia` | `string` |  |
| `modelo` | `string` |  |
| `sigla_combustivel` | `string` |  |
| `tipo_veiculo` | `number` |  |
| `valor` | `string` |  |

#### Example: Load

```lua
local fipe_preco, err = client:FipePreco():load()
```


### Municipio

Create an instance: `local municipio = client:Municipio(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `codigo_ibge` | `string` |  |
| `nome` | `string` |  |

#### Example: Load

```lua
local municipio, err = client:Municipio():load()
```


### Ufn

Create an instance: `local ufn = client:Ufn(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `nome` | `string` |  |
| `regiao` | `table` |  |
| `sigla` | `string` |  |

#### Example: List

```lua
local ufns, err = client:Ufn():list()
```


### Ufn2

Create an instance: `local ufn2 = client:Ufn2(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `nome` | `string` |  |
| `regiao` | `table` |  |
| `sigla` | `string` |  |

#### Example: Load

```lua
local ufn2, err = client:Ufn2():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── brasil_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`brasil_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local bank = client:Bank()
bank:list()

-- bank:data_get() now returns the bank data from the last list
-- bank:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
