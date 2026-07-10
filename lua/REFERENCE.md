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
local bank = client:Bank(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `number` | No |  |
| `full_name` | `string` | No |  |
| `ispb` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Bank():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Bank():load({ code = "code" })
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
local cep = client:Cep(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | `string` | No |  |
| `city` | `string` | No |  |
| `location` | `table` | No |  |
| `neighborhood` | `string` | No |  |
| `service` | `string` | No |  |
| `state` | `string` | No |  |
| `street` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cep():load({ cep = "cep" })
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
local cnpj = client:Cnpj(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | `string` | No |  |
| `capital_social` | `number` | No |  |
| `cep` | `string` | No |  |
| `cnae_fiscal` | `number` | No |  |
| `cnae_fiscal_descricao` | `string` | No |  |
| `cnpj` | `string` | No |  |
| `complemento` | `string` | No |  |
| `data_inicio_atividade` | `string` | No |  |
| `ddd_telefone_1` | `string` | No |  |
| `logradouro` | `string` | No |  |
| `municipio` | `string` | No |  |
| `natureza_juridica` | `string` | No |  |
| `nome_fantasia` | `string` | No |  |
| `numero` | `string` | No |  |
| `porte` | `string` | No |  |
| `qsa` | `table` | No |  |
| `razao_social` | `string` | No |  |
| `uf` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cnpj():load({ cnpj = "cnpj" })
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
local ddd = client:Ddd(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `table` | No |  |
| `state` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Ddd():load({ ddd = "ddd" })
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
local feriado = client:Feriado(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Feriado():load({ ano = 1 })
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
local fipe_marca = client:FipeMarca(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `string` | No |  |
| `valor` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FipeMarca():load({ tipo_veiculo = "tipo_veiculo" })
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
local fipe_preco = client:FipePreco(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ano_modelo` | `number` | No |  |
| `codigo_fipe` | `string` | No |  |
| `combustivel` | `string` | No |  |
| `marca` | `string` | No |  |
| `mes_referencia` | `string` | No |  |
| `modelo` | `string` | No |  |
| `sigla_combustivel` | `string` | No |  |
| `tipo_veiculo` | `number` | No |  |
| `valor` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FipePreco():load({ codigo_fipe = "codigo_fipe" })
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
local municipio = client:Municipio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `string` | No |  |
| `nome` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Municipio():load({ sigla_uf = "sigla_uf" })
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
local ufn = client:Ufn(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `table` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Ufn():list()
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
local ufn2 = client:Ufn2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `table` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Ufn2():load({ sigla_uf = "sigla_uf" })
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

