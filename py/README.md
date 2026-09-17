# Brasil Python SDK



The Python SDK for the Brasil API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Bank()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/brasil-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from brasil_sdk import BrasilSDK

client = BrasilSDK()
```

### 2. List bank records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    banks = client.Bank().list()
    for bank in banks:
        print(bank)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a bank

Bank is nested under code, so provide the `code`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    bank = client.Bank().load({"code": "example_code"})
    print(bank)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    ufns = client.Ufn().list()
    print(ufns)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = BrasilSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
ufn = client.Ufn().list()
# ufn contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = BrasilSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### BrasilSDK

```python
from brasil_sdk import BrasilSDK

client = BrasilSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = BrasilSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### BrasilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
| `id` |  |
| `nome` |  |
| `sigla` |  |

Operations: List, Load.

API path: `/ibge/uf/v1`



## Entities


### Bank

Create an instance: `bank = client.Bank()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `int` | Código do banco |
| `fullName` | `str` | Nome completo do banco |
| `ispb` | `str` | Identificador único do banco |
| `name` | `str` | Nome do banco |

#### Example: Load

```python
bank = client.Bank().load({"code": "code"})
```

#### Example: List

```python
banks = client.Bank().list()
```


### Cep

Create an instance: `cep = client.Cep()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `coordinates` | `dict` |  |
| `type` | `str` |  |

#### Example: Load

```python
cep = client.Cep().load({"cep": "cep"})
```


### Cnpj

Create an instance: `cnpj = client.Cnpj()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bairro` | `str` | Bairro |
| `capital_social` | `float` | Capital social da empresa |
| `cep` | `str` | CEP |
| `cnae_fiscal` | `int` | CNAE fiscal principal |
| `cnae_fiscal_descricao` | `str` | Descrição do CNAE fiscal |
| `cnpj` | `str` | CNPJ consultado |
| `complemento` | `str` | Complemento do endereço |
| `data_inicio_atividade` | `str` | Data de início das atividades |
| `ddd_telefone_1` | `str` | Telefone principal |
| `logradouro` | `str` | Logradouro do endereço |
| `municipio` | `str` | Município |
| `natureza_juridica` | `str` | Código da natureza jurídica |
| `nome_fantasia` | `str` | Nome fantasia da empresa |
| `numero` | `str` | Número do endereço |
| `porte` | `str` | Porte da empresa |
| `qsa` | `list` | Quadro de sócios e administradores |
| `razao_social` | `str` | Razão social da empresa |
| `uf` | `str` | UF |

#### Example: Load

```python
cnpj = client.Cnpj().load({"cnpj": "cnpj"})
```


### Ddd

Create an instance: `ddd = client.Ddd()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cities` | `list` | Lista de cidades com este DDD |
| `state` | `str` | Sigla do estado |

#### Example: Load

```python
ddd = client.Ddd().load({"ddd": "ddd"})
```


### Feriado

Create an instance: `feriado = client.Feriado()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `str` | Data do feriado |
| `name` | `str` | Nome do feriado |
| `type` | `str` | Tipo de feriado |

#### Example: Load

```python
feriado = client.Feriado().load({"ano": 1})
```


### FipeMarca

Create an instance: `fipe_marca = client.FipeMarca()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `nome` | `str` | Nome da marca |
| `valor` | `str` | Código da marca |

#### Example: Load

```python
fipe_marca = client.FipeMarca().load({"tipo_veiculo": "tipo_veiculo"})
```


### FipePreco

Create an instance: `fipe_preco = client.FipePreco()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `anoModelo` | `int` | Ano do modelo |
| `codigoFipe` | `str` | Código FIPE |
| `combustivel` | `str` | Tipo de combustível |
| `marca` | `str` | Marca do veículo |
| `mesReferencia` | `str` | Mês de referência da tabela |
| `modelo` | `str` | Modelo do veículo |
| `siglaCombustivel` | `str` | Sigla do combustível |
| `tipoVeiculo` | `int` | Tipo do veículo |
| `valor` | `str` | Valor do veículo |

#### Example: Load

```python
fipe_preco = client.FipePreco().load({"codigo_fipe": "codigo_fipe"})
```


### Municipio

Create an instance: `municipio = client.Municipio()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `codigo_ibge` | `str` | Código IBGE do município |
| `nome` | `str` | Nome do município |

#### Example: Load

```python
municipio = client.Municipio().load({"sigla_uf": "sigla_uf"})
```


### Ufn

Create an instance: `ufn = client.Ufn()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `str` |  |
| `sigla` | `str` |  |

#### Example: Load

```python
ufn = client.Ufn().load({"sigla_uf": "sigla_uf"})
```

#### Example: List

```python
ufns = client.Ufn().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── brasil_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`brasil_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
ufn = client.Ufn()
ufn.list()

# ufn.data_get() now returns the ufn data from the last list
# ufn.match_get() returns the last match criteria
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
