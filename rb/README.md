# Brasil Ruby SDK



The Ruby SDK for the Brasil API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Bank` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/brasil-sdk/releases](https://github.com/voxgig-sdk/brasil-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Brasil_sdk"

client = BrasilSDK.new
```

### 2. List bank records

```ruby
begin
  # list returns an Array of Bank records — iterate directly.
  banks = client.Bank.list
  banks.each do |item|
    puts "#{item["code"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a bank

Bank is nested under code, so provide the `code`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Bank record (raises on error).
  bank = client.Bank.load({ "code" => "example_code" })
  puts bank
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  banks = client.Bank.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = BrasilSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
bank = client.Bank.list()
puts bank
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = BrasilSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### BrasilSDK

```ruby
require_relative "Brasil_sdk"
client = BrasilSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = BrasilSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### BrasilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Bank` | `(data) -> BankEntity` | Create a Bank entity instance. |
| `Cep` | `(data) -> CepEntity` | Create a Cep entity instance. |
| `Cnpj` | `(data) -> CnpjEntity` | Create a Cnpj entity instance. |
| `Ddd` | `(data) -> DddEntity` | Create a Ddd entity instance. |
| `Feriado` | `(data) -> FeriadoEntity` | Create a Feriado entity instance. |
| `FipeMarca` | `(data) -> FipeMarcaEntity` | Create a FipeMarca entity instance. |
| `FipePreco` | `(data) -> FipePrecoEntity` | Create a FipePreco entity instance. |
| `Municipio` | `(data) -> MunicipioEntity` | Create a Municipio entity instance. |
| `Ufn` | `(data) -> UfnEntity` | Create an Ufn entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `BrasilError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Bank

| Field | Description |
| --- | --- |
| `code` | Código do banco |
| `fullName` | Nome completo do banco |
| `ispb` | Identificador único do banco |
| `name` | Nome do banco |

Operations: List, Load.

API path: `/banks/v1`

#### Cep

| Field | Description |
| --- | --- |
| `coordinates` |  |
| `type` |  |

Operations: Load.

API path: `/cep/v1/{cep}`

#### Cnpj

| Field | Description |
| --- | --- |
| `bairro` | Bairro |
| `capital_social` | Capital social da empresa |
| `cep` | CEP |
| `cnae_fiscal` | CNAE fiscal principal |
| `cnae_fiscal_descricao` | Descrição do CNAE fiscal |
| `cnpj` | CNPJ consultado |
| `complemento` | Complemento do endereço |
| `data_inicio_atividade` | Data de início das atividades |
| `ddd_telefone_1` | Telefone principal |
| `logradouro` | Logradouro do endereço |
| `municipio` | Município |
| `natureza_juridica` | Código da natureza jurídica |
| `nome_fantasia` | Nome fantasia da empresa |
| `numero` | Número do endereço |
| `porte` | Porte da empresa |
| `qsa` | Quadro de sócios e administradores |
| `razao_social` | Razão social da empresa |
| `uf` | UF |

Operations: Load.

API path: `/cnpj/v1/{cnpj}`

#### Ddd

| Field | Description |
| --- | --- |
| `cities` | Lista de cidades com este DDD |
| `state` | Sigla do estado |

Operations: Load.

API path: `/ddd/v1/{ddd}`

#### Feriado

| Field | Description |
| --- | --- |
| `date` | Data do feriado |
| `name` | Nome do feriado |
| `type` | Tipo de feriado |

Operations: Load.

API path: `/feriados/v1/{ano}`

#### FipeMarca

| Field | Description |
| --- | --- |
| `nome` | Nome da marca |
| `valor` | Código da marca |

Operations: Load.

API path: `/fipe/marcas/v1/{tipoVeiculo}`

#### FipePreco

| Field | Description |
| --- | --- |
| `anoModelo` | Ano do modelo |
| `codigoFipe` | Código FIPE |
| `combustivel` | Tipo de combustível |
| `marca` | Marca do veículo |
| `mesReferencia` | Mês de referência da tabela |
| `modelo` | Modelo do veículo |
| `siglaCombustivel` | Sigla do combustível |
| `tipoVeiculo` | Tipo do veículo |
| `valor` | Valor do veículo |

Operations: Load.

API path: `/fipe/preco/v1/{codigoFipe}`

#### Municipio

| Field | Description |
| --- | --- |
| `codigo_ibge` | Código IBGE do município |
| `nome` | Nome do município |

Operations: Load.

API path: `/ibge/municipios/v1/{siglaUF}`

#### Ufn

| Field | Description |
| --- | --- |
| `id` | ID da UF |
| `nome` | Nome da UF |
| `regiao` |  |
| `sigla` | Sigla da UF |

Operations: List, Load.

API path: `/ibge/uf/v1`



## Entities


### Bank

Create an instance: `bank = client.Bank`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `Integer` | Código do banco |
| `fullName` | `String` | Nome completo do banco |
| `ispb` | `String` | Identificador único do banco |
| `name` | `String` | Nome do banco |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Bank record (raises on error).
bank = client.Bank.load({ "code" => "code" })
```

#### Example: List

```ruby
# list returns an Array of Bank records (raises on error).
banks = client.Bank.list
```


### Cep

Create an instance: `cep = client.Cep`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `coordinates` | `Hash` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Cep record (raises on error).
cep = client.Cep.load({ "cep" => "cep" })
```


### Cnpj

Create an instance: `cnpj = client.Cnpj`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bairro` | `String` | Bairro |
| `capital_social` | `Float` | Capital social da empresa |
| `cep` | `String` | CEP |
| `cnae_fiscal` | `Integer` | CNAE fiscal principal |
| `cnae_fiscal_descricao` | `String` | Descrição do CNAE fiscal |
| `cnpj` | `String` | CNPJ consultado |
| `complemento` | `String` | Complemento do endereço |
| `data_inicio_atividade` | `String` | Data de início das atividades |
| `ddd_telefone_1` | `String` | Telefone principal |
| `logradouro` | `String` | Logradouro do endereço |
| `municipio` | `String` | Município |
| `natureza_juridica` | `String` | Código da natureza jurídica |
| `nome_fantasia` | `String` | Nome fantasia da empresa |
| `numero` | `String` | Número do endereço |
| `porte` | `String` | Porte da empresa |
| `qsa` | `Array` | Quadro de sócios e administradores |
| `razao_social` | `String` | Razão social da empresa |
| `uf` | `String` | UF |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Cnpj record (raises on error).
cnpj = client.Cnpj.load({ "cnpj" => "cnpj" })
```


### Ddd

Create an instance: `ddd = client.Ddd`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cities` | `Array` | Lista de cidades com este DDD |
| `state` | `String` | Sigla do estado |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Ddd record (raises on error).
ddd = client.Ddd.load({ "ddd" => "ddd" })
```


### Feriado

Create an instance: `feriado = client.Feriado`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `String` | Data do feriado |
| `name` | `String` | Nome do feriado |
| `type` | `String` | Tipo de feriado |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Feriado record (raises on error).
feriado = client.Feriado.load({ "ano" => 1 })
```


### FipeMarca

Create an instance: `fipe_marca = client.FipeMarca`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `nome` | `String` | Nome da marca |
| `valor` | `String` | Código da marca |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FipeMarca record (raises on error).
fipe_marca = client.FipeMarca.load({ "tipo_veiculo" => "tipo_veiculo" })
```


### FipePreco

Create an instance: `fipe_preco = client.FipePreco`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anoModelo` | `Integer` | Ano do modelo |
| `codigoFipe` | `String` | Código FIPE |
| `combustivel` | `String` | Tipo de combustível |
| `marca` | `String` | Marca do veículo |
| `mesReferencia` | `String` | Mês de referência da tabela |
| `modelo` | `String` | Modelo do veículo |
| `siglaCombustivel` | `String` | Sigla do combustível |
| `tipoVeiculo` | `Integer` | Tipo do veículo |
| `valor` | `String` | Valor do veículo |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FipePreco record (raises on error).
fipe_preco = client.FipePreco.load({ "codigo_fipe" => "codigo_fipe" })
```


### Municipio

Create an instance: `municipio = client.Municipio`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `codigo_ibge` | `String` | Código IBGE do município |
| `nome` | `String` | Nome do município |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Municipio record (raises on error).
municipio = client.Municipio.load({ "sigla_uf" => "sigla_uf" })
```


### Ufn

Create an instance: `ufn = client.Ufn`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` | ID da UF |
| `nome` | `String` | Nome da UF |
| `regiao` | `Hash` |  |
| `sigla` | `String` | Sigla da UF |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Ufn record (raises on error).
ufn = client.Ufn.load({ "sigla_uf" => "sigla_uf" })
```

#### Example: List

```ruby
# list returns an Array of Ufn records (raises on error).
ufns = client.Ufn.list
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Brasil_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Brasil_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
bank = client.Bank
bank.list()

# bank.data_get now returns the bank data from the last list
# bank.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
