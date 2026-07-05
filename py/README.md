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

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    bank = client.Bank().load()
    print(bank)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    banks = client.Bank().list()
    print(banks)
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

# Entity ops return the bare record and raise on error.
bank = client.Bank().list()
# bank contains the mock response record
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
| `Ufn2` | `(data) -> Ufn2Entity` | Create an Ufn2 entity instance. |

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

Entity operations return the bare result data (a `dict` for single-entity
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

Create an instance: `bank = client.Bank()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `int` |  |
| `full_name` | `str` |  |
| `ispb` | `str` |  |
| `name` | `str` |  |

#### Example: Load

```python
bank = client.Bank().load()
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
| `cep` | `str` |  |
| `city` | `str` |  |
| `location` | `dict` |  |
| `neighborhood` | `str` |  |
| `service` | `str` |  |
| `state` | `str` |  |
| `street` | `str` |  |

#### Example: Load

```python
cep = client.Cep().load()
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
| `bairro` | `str` |  |
| `capital_social` | `float` |  |
| `cep` | `str` |  |
| `cnae_fiscal` | `int` |  |
| `cnae_fiscal_descricao` | `str` |  |
| `cnpj` | `str` |  |
| `complemento` | `str` |  |
| `data_inicio_atividade` | `str` |  |
| `ddd_telefone_1` | `str` |  |
| `logradouro` | `str` |  |
| `municipio` | `str` |  |
| `natureza_juridica` | `str` |  |
| `nome_fantasia` | `str` |  |
| `numero` | `str` |  |
| `porte` | `str` |  |
| `qsa` | `list` |  |
| `razao_social` | `str` |  |
| `uf` | `str` |  |

#### Example: Load

```python
cnpj = client.Cnpj().load()
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
| `city` | `list` |  |
| `state` | `str` |  |

#### Example: Load

```python
ddd = client.Ddd().load()
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
| `date` | `str` |  |
| `name` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
feriado = client.Feriado().load()
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
| `nome` | `str` |  |
| `valor` | `str` |  |

#### Example: Load

```python
fipe_marca = client.FipeMarca().load()
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
| `ano_modelo` | `int` |  |
| `codigo_fipe` | `str` |  |
| `combustivel` | `str` |  |
| `marca` | `str` |  |
| `mes_referencia` | `str` |  |
| `modelo` | `str` |  |
| `sigla_combustivel` | `str` |  |
| `tipo_veiculo` | `int` |  |
| `valor` | `str` |  |

#### Example: Load

```python
fipe_preco = client.FipePreco().load()
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
| `codigo_ibge` | `str` |  |
| `nome` | `str` |  |

#### Example: Load

```python
municipio = client.Municipio().load()
```


### Ufn

Create an instance: `ufn = client.Ufn()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `str` |  |
| `regiao` | `dict` |  |
| `sigla` | `str` |  |

#### Example: List

```python
ufns = client.Ufn().list()
```


### Ufn2

Create an instance: `ufn2 = client.Ufn2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `str` |  |
| `regiao` | `dict` |  |
| `sigla` | `str` |  |

#### Example: Load

```python
ufn2 = client.Ufn2().load()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
bank = client.Bank()
bank.list()

# bank.data_get() now returns the bank data from the last list
# bank.match_get() returns the last match criteria
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
