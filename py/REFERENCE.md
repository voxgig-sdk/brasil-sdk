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
bank = client.bank
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$INTEGER`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `ispb` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.bank.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.bank.load({"id": "bank_id"})
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
cep = client.cep
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | ``$STRING`` | No |  |
| `city` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `neighborhood` | ``$STRING`` | No |  |
| `service` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | No |  |
| `street` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.cep.load({"id": "cep_id"})
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
cnpj = client.cnpj
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | ``$STRING`` | No |  |
| `capital_social` | ``$NUMBER`` | No |  |
| `cep` | ``$STRING`` | No |  |
| `cnae_fiscal` | ``$INTEGER`` | No |  |
| `cnae_fiscal_descricao` | ``$STRING`` | No |  |
| `cnpj` | ``$STRING`` | No |  |
| `complemento` | ``$STRING`` | No |  |
| `data_inicio_atividade` | ``$STRING`` | No |  |
| `ddd_telefone_1` | ``$STRING`` | No |  |
| `logradouro` | ``$STRING`` | No |  |
| `municipio` | ``$STRING`` | No |  |
| `natureza_juridica` | ``$STRING`` | No |  |
| `nome_fantasia` | ``$STRING`` | No |  |
| `numero` | ``$STRING`` | No |  |
| `porte` | ``$STRING`` | No |  |
| `qsa` | ``$ARRAY`` | No |  |
| `razao_social` | ``$STRING`` | No |  |
| `uf` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.cnpj.load({"id": "cnpj_id"})
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
ddd = client.ddd
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$ARRAY`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ddd.load({"id": "ddd_id"})
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
feriado = client.feriado
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.feriado.load({"id": "feriado_id"})
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
fipe_marca = client.fipe_marca
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | ``$STRING`` | No |  |
| `valor` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.fipe_marca.load({"id": "fipe_marca_id"})
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
fipe_preco = client.fipe_preco
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ano_modelo` | ``$INTEGER`` | No |  |
| `codigo_fipe` | ``$STRING`` | No |  |
| `combustivel` | ``$STRING`` | No |  |
| `marca` | ``$STRING`` | No |  |
| `mes_referencia` | ``$STRING`` | No |  |
| `modelo` | ``$STRING`` | No |  |
| `sigla_combustivel` | ``$STRING`` | No |  |
| `tipo_veiculo` | ``$INTEGER`` | No |  |
| `valor` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.fipe_preco.load({"id": "fipe_preco_id"})
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
municipio = client.municipio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | ``$STRING`` | No |  |
| `nome` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.municipio.load({"id": "municipio_id"})
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
ufn = client.ufn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.ufn.list({})
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
ufn2 = client.ufn2
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ufn2.load({"id": "ufn2_id"})
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

