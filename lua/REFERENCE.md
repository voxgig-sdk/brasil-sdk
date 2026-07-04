# Brasil Lua SDK Reference

Complete API reference for the Brasil Lua SDK.


## BrasilSDK

### Constructor

```lua
local sdk = require("brasil_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Bank(data)`

Create a new `Bank` entity instance. Pass `nil` for no initial data.

#### `Cep(data)`

Create a new `Cep` entity instance. Pass `nil` for no initial data.

#### `Cnpj(data)`

Create a new `Cnpj` entity instance. Pass `nil` for no initial data.

#### `Ddd(data)`

Create a new `Ddd` entity instance. Pass `nil` for no initial data.

#### `Feriado(data)`

Create a new `Feriado` entity instance. Pass `nil` for no initial data.

#### `FipeMarca(data)`

Create a new `FipeMarca` entity instance. Pass `nil` for no initial data.

#### `FipePreco(data)`

Create a new `FipePreco` entity instance. Pass `nil` for no initial data.

#### `Municipio(data)`

Create a new `Municipio` entity instance. Pass `nil` for no initial data.

#### `Ufn(data)`

Create a new `Ufn` entity instance. Pass `nil` for no initial data.

#### `Ufn2(data)`

Create a new `Ufn2` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BankEntity

```lua
local bank = client:bank(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$INTEGER`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `ispb` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:bank():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:bank():load({ id = "bank_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CepEntity

```lua
local cep = client:cep(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:cep():load({ id = "cep_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CepEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CnpjEntity

```lua
local cnpj = client:cnpj(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:cnpj():load({ id = "cnpj_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CnpjEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DddEntity

```lua
local ddd = client:ddd(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$ARRAY`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ddd():load({ id = "ddd_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DddEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FeriadoEntity

```lua
local feriado = client:feriado(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:feriado():load({ id = "feriado_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeriadoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FipeMarcaEntity

```lua
local fipe_marca = client:fipe_marca(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | ``$STRING`` | No |  |
| `valor` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:fipe_marca():load({ id = "fipe_marca_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FipeMarcaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FipePrecoEntity

```lua
local fipe_preco = client:fipe_preco(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:fipe_preco():load({ id = "fipe_preco_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FipePrecoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MunicipioEntity

```lua
local municipio = client:municipio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | ``$STRING`` | No |  |
| `nome` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:municipio():load({ id = "municipio_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MunicipioEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UfnEntity

```lua
local ufn = client:ufn(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ufn():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UfnEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Ufn2Entity

```lua
local ufn2 = client:ufn2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ufn2():load({ id = "ufn2_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `Ufn2Entity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

