# Brasil Ruby SDK Reference

Complete API reference for the Brasil Ruby SDK.


## BrasilSDK

### Constructor

```ruby
require_relative 'Brasil_sdk'

client = BrasilSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BrasilSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = BrasilSDK.test
```


### Instance Methods

#### `Bank(data = nil)`

Create a new `Bank` entity instance. Pass `nil` for no initial data.

#### `Cep(data = nil)`

Create a new `Cep` entity instance. Pass `nil` for no initial data.

#### `Cnpj(data = nil)`

Create a new `Cnpj` entity instance. Pass `nil` for no initial data.

#### `Ddd(data = nil)`

Create a new `Ddd` entity instance. Pass `nil` for no initial data.

#### `Feriado(data = nil)`

Create a new `Feriado` entity instance. Pass `nil` for no initial data.

#### `FipeMarca(data = nil)`

Create a new `FipeMarca` entity instance. Pass `nil` for no initial data.

#### `FipePreco(data = nil)`

Create a new `FipePreco` entity instance. Pass `nil` for no initial data.

#### `Municipio(data = nil)`

Create a new `Municipio` entity instance. Pass `nil` for no initial data.

#### `Ufn(data = nil)`

Create a new `Ufn` entity instance. Pass `nil` for no initial data.

#### `Ufn2(data = nil)`

Create a new `Ufn2` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BankEntity

```ruby
bank = client.Bank
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `Integer` | No |  |
| `full_name` | `String` | No |  |
| `ispb` | `String` | No |  |
| `name` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Bank.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Bank.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BankEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CepEntity

```ruby
cep = client.Cep
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | `String` | No |  |
| `city` | `String` | No |  |
| `location` | `Hash` | No |  |
| `neighborhood` | `String` | No |  |
| `service` | `String` | No |  |
| `state` | `String` | No |  |
| `street` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cep.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CepEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CnpjEntity

```ruby
cnpj = client.Cnpj
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | `String` | No |  |
| `capital_social` | `Float` | No |  |
| `cep` | `String` | No |  |
| `cnae_fiscal` | `Integer` | No |  |
| `cnae_fiscal_descricao` | `String` | No |  |
| `cnpj` | `String` | No |  |
| `complemento` | `String` | No |  |
| `data_inicio_atividade` | `String` | No |  |
| `ddd_telefone_1` | `String` | No |  |
| `logradouro` | `String` | No |  |
| `municipio` | `String` | No |  |
| `natureza_juridica` | `String` | No |  |
| `nome_fantasia` | `String` | No |  |
| `numero` | `String` | No |  |
| `porte` | `String` | No |  |
| `qsa` | `Array` | No |  |
| `razao_social` | `String` | No |  |
| `uf` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cnpj.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CnpjEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DddEntity

```ruby
ddd = client.Ddd
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `Array` | No |  |
| `state` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Ddd.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DddEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FeriadoEntity

```ruby
feriado = client.Feriado
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `String` | No |  |
| `name` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Feriado.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FeriadoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FipeMarcaEntity

```ruby
fipe_marca = client.FipeMarca
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `String` | No |  |
| `valor` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FipeMarca.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FipeMarcaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FipePrecoEntity

```ruby
fipe_preco = client.FipePreco
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ano_modelo` | `Integer` | No |  |
| `codigo_fipe` | `String` | No |  |
| `combustivel` | `String` | No |  |
| `marca` | `String` | No |  |
| `mes_referencia` | `String` | No |  |
| `modelo` | `String` | No |  |
| `sigla_combustivel` | `String` | No |  |
| `tipo_veiculo` | `Integer` | No |  |
| `valor` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FipePreco.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FipePrecoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MunicipioEntity

```ruby
municipio = client.Municipio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `String` | No |  |
| `nome` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Municipio.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MunicipioEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UfnEntity

```ruby
ufn = client.Ufn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No |  |
| `nome` | `String` | No |  |
| `regiao` | `Hash` | No |  |
| `sigla` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Ufn.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UfnEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Ufn2Entity

```ruby
ufn2 = client.Ufn2
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No |  |
| `nome` | `String` | No |  |
| `regiao` | `Hash` | No |  |
| `sigla` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Ufn2.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `Ufn2Entity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = BrasilSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

