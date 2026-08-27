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
| `code` | `number` | No | Código do banco |
| `fullName` | `string` | No | Nome completo do banco |
| `ispb` | `string` | No | Identificador único do banco |
| `name` | `string` | No | Nome do banco |

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
| `coordinates` | `table` | No |  |
| `type` | `string` | No |  |

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
| `bairro` | `string` | No | Bairro |
| `capital_social` | `number` | No | Capital social da empresa |
| `cep` | `string` | No | CEP |
| `cnae_fiscal` | `number` | No | CNAE fiscal principal |
| `cnae_fiscal_descricao` | `string` | No | Descrição do CNAE fiscal |
| `cnpj` | `string` | No | CNPJ consultado |
| `complemento` | `string` | No | Complemento do endereço |
| `data_inicio_atividade` | `string` | No | Data de início das atividades |
| `ddd_telefone_1` | `string` | No | Telefone principal |
| `logradouro` | `string` | No | Logradouro do endereço |
| `municipio` | `string` | No | Município |
| `natureza_juridica` | `string` | No | Código da natureza jurídica |
| `nome_fantasia` | `string` | No | Nome fantasia da empresa |
| `numero` | `string` | No | Número do endereço |
| `porte` | `string` | No | Porte da empresa |
| `qsa` | `table` | No | Quadro de sócios e administradores |
| `razao_social` | `string` | No | Razão social da empresa |
| `uf` | `string` | No | UF |

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
| `cities` | `table` | No | Lista de cidades com este DDD |
| `state` | `string` | No | Sigla do estado |

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
| `date` | `string` | No | Data do feriado |
| `name` | `string` | No | Nome do feriado |
| `type` | `string` | No | Tipo de feriado |

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
| `nome` | `string` | No | Nome da marca |
| `valor` | `string` | No | Código da marca |

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
| `anoModelo` | `number` | No | Ano do modelo |
| `codigoFipe` | `string` | No | Código FIPE |
| `combustivel` | `string` | No | Tipo de combustível |
| `marca` | `string` | No | Marca do veículo |
| `mesReferencia` | `string` | No | Mês de referência da tabela |
| `modelo` | `string` | No | Modelo do veículo |
| `siglaCombustivel` | `string` | No | Sigla do combustível |
| `tipoVeiculo` | `number` | No | Tipo do veículo |
| `valor` | `string` | No | Valor do veículo |

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
| `codigo_ibge` | `string` | No | Código IBGE do município |
| `nome` | `string` | No | Nome do município |

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
| `id` | `number` | No | ID da UF |
| `nome` | `string` | No | Nome da UF |
| `regiao` | `table` | No |  |
| `sigla` | `string` | No | Sigla da UF |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Ufn():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Ufn():load({ sigla_uf = "sigla_uf" })
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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

