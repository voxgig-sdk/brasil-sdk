# Brasil Python SDK Reference

Complete API reference for the Brasil Python SDK.


## BrasilSDK

### Constructor

```python
from brasil_sdk import BrasilSDK

client = BrasilSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BrasilSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = BrasilSDK.test()
```


### Instance Methods

#### `Bank(data=None)`

Create a new `BankEntity` instance. Pass `None` for no initial data.

#### `Cep(data=None)`

Create a new `CepEntity` instance. Pass `None` for no initial data.

#### `Cnpj(data=None)`

Create a new `CnpjEntity` instance. Pass `None` for no initial data.

#### `Ddd(data=None)`

Create a new `DddEntity` instance. Pass `None` for no initial data.

#### `Feriado(data=None)`

Create a new `FeriadoEntity` instance. Pass `None` for no initial data.

#### `FipeMarca(data=None)`

Create a new `FipeMarcaEntity` instance. Pass `None` for no initial data.

#### `FipePreco(data=None)`

Create a new `FipePrecoEntity` instance. Pass `None` for no initial data.

#### `Municipio(data=None)`

Create a new `MunicipioEntity` instance. Pass `None` for no initial data.

#### `Ufn(data=None)`

Create a new `UfnEntity` instance. Pass `None` for no initial data.

#### `Ufn2(data=None)`

Create a new `Ufn2Entity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BankEntity

```python
bank = client.Bank()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `int` | No |  |
| `full_name` | `str` | No |  |
| `ispb` | `str` | No |  |
| `name` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Bank().list()
for bank in results:
    print(bank)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Bank().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CepEntity

```python
cep = client.Cep()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | `str` | No |  |
| `city` | `str` | No |  |
| `location` | `dict` | No |  |
| `neighborhood` | `str` | No |  |
| `service` | `str` | No |  |
| `state` | `str` | No |  |
| `street` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cep().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CepEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CnpjEntity

```python
cnpj = client.Cnpj()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | `str` | No |  |
| `capital_social` | `float` | No |  |
| `cep` | `str` | No |  |
| `cnae_fiscal` | `int` | No |  |
| `cnae_fiscal_descricao` | `str` | No |  |
| `cnpj` | `str` | No |  |
| `complemento` | `str` | No |  |
| `data_inicio_atividade` | `str` | No |  |
| `ddd_telefone_1` | `str` | No |  |
| `logradouro` | `str` | No |  |
| `municipio` | `str` | No |  |
| `natureza_juridica` | `str` | No |  |
| `nome_fantasia` | `str` | No |  |
| `numero` | `str` | No |  |
| `porte` | `str` | No |  |
| `qsa` | `list` | No |  |
| `razao_social` | `str` | No |  |
| `uf` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cnpj().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CnpjEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DddEntity

```python
ddd = client.Ddd()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `list` | No |  |
| `state` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Ddd().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DddEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FeriadoEntity

```python
feriado = client.Feriado()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | No |  |
| `name` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Feriado().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeriadoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FipeMarcaEntity

```python
fipe_marca = client.FipeMarca()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `str` | No |  |
| `valor` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FipeMarca().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FipeMarcaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FipePrecoEntity

```python
fipe_preco = client.FipePreco()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ano_modelo` | `int` | No |  |
| `codigo_fipe` | `str` | No |  |
| `combustivel` | `str` | No |  |
| `marca` | `str` | No |  |
| `mes_referencia` | `str` | No |  |
| `modelo` | `str` | No |  |
| `sigla_combustivel` | `str` | No |  |
| `tipo_veiculo` | `int` | No |  |
| `valor` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FipePreco().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FipePrecoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MunicipioEntity

```python
municipio = client.Municipio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `str` | No |  |
| `nome` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Municipio().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MunicipioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UfnEntity

```python
ufn = client.Ufn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `nome` | `str` | No |  |
| `regiao` | `dict` | No |  |
| `sigla` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ufn().list()
for ufn in results:
    print(ufn)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UfnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Ufn2Entity

```python
ufn2 = client.Ufn2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `nome` | `str` | No |  |
| `regiao` | `dict` | No |  |
| `sigla` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Ufn2().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `Ufn2Entity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = BrasilSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

