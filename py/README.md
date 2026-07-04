# Brasil Python SDK



The Python SDK for the Brasil API — an entity-oriented client following Pythonic conventions.

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
    banks = client.Bank().list({})
    for bank in banks:
        print(bank)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a bank

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    bank = client.Bank().load({"id": "example_id"})
    print(bank)
except Exception as err:
    print(f"load failed: {err}")
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
    print(result["err"])     # error value
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
bank = client.Bank().load({"id": "test01"})
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
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | ``$INTEGER`` |  |
| `full_name` | ``$STRING`` |  |
| `ispb` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```python
bank = client.Bank().load({"id": "bank_id"})
```

#### Example: List

```python
banks = client.Bank().list({})
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
| `cep` | ``$STRING`` |  |
| `city` | ``$STRING`` |  |
| `location` | ``$OBJECT`` |  |
| `neighborhood` | ``$STRING`` |  |
| `service` | ``$STRING`` |  |
| `state` | ``$STRING`` |  |
| `street` | ``$STRING`` |  |

#### Example: Load

```python
cep = client.Cep().load({"id": "cep_id"})
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
| `bairro` | ``$STRING`` |  |
| `capital_social` | ``$NUMBER`` |  |
| `cep` | ``$STRING`` |  |
| `cnae_fiscal` | ``$INTEGER`` |  |
| `cnae_fiscal_descricao` | ``$STRING`` |  |
| `cnpj` | ``$STRING`` |  |
| `complemento` | ``$STRING`` |  |
| `data_inicio_atividade` | ``$STRING`` |  |
| `ddd_telefone_1` | ``$STRING`` |  |
| `logradouro` | ``$STRING`` |  |
| `municipio` | ``$STRING`` |  |
| `natureza_juridica` | ``$STRING`` |  |
| `nome_fantasia` | ``$STRING`` |  |
| `numero` | ``$STRING`` |  |
| `porte` | ``$STRING`` |  |
| `qsa` | ``$ARRAY`` |  |
| `razao_social` | ``$STRING`` |  |
| `uf` | ``$STRING`` |  |

#### Example: Load

```python
cnpj = client.Cnpj().load({"id": "cnpj_id"})
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
| `city` | ``$ARRAY`` |  |
| `state` | ``$STRING`` |  |

#### Example: Load

```python
ddd = client.Ddd().load({"id": "ddd_id"})
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
| `date` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```python
feriado = client.Feriado().load({"id": "feriado_id"})
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
| `nome` | ``$STRING`` |  |
| `valor` | ``$STRING`` |  |

#### Example: Load

```python
fipe_marca = client.FipeMarca().load({"id": "fipe_marca_id"})
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
| `ano_modelo` | ``$INTEGER`` |  |
| `codigo_fipe` | ``$STRING`` |  |
| `combustivel` | ``$STRING`` |  |
| `marca` | ``$STRING`` |  |
| `mes_referencia` | ``$STRING`` |  |
| `modelo` | ``$STRING`` |  |
| `sigla_combustivel` | ``$STRING`` |  |
| `tipo_veiculo` | ``$INTEGER`` |  |
| `valor` | ``$STRING`` |  |

#### Example: Load

```python
fipe_preco = client.FipePreco().load({"id": "fipe_preco_id"})
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
| `codigo_ibge` | ``$STRING`` |  |
| `nome` | ``$STRING`` |  |

#### Example: Load

```python
municipio = client.Municipio().load({"id": "municipio_id"})
```


### Ufn

Create an instance: `ufn = client.Ufn()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `nome` | ``$STRING`` |  |
| `regiao` | ``$OBJECT`` |  |
| `sigla` | ``$STRING`` |  |

#### Example: List

```python
ufns = client.Ufn().list({})
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
| `id` | ``$INTEGER`` |  |
| `nome` | ``$STRING`` |  |
| `regiao` | ``$OBJECT`` |  |
| `sigla` | ``$STRING`` |  |

#### Example: Load

```python
ufn2 = client.Ufn2().load({"id": "ufn2_id"})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
bank = client.Bank()
bank.load({"id": "example_id"})

# bank.data_get() now returns the loaded bank data
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
