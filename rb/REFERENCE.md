# Brasil Ruby SDK Reference

Complete API reference for the Brasil Ruby SDK.


## BrasilSDK

### Constructor

```ruby
require_relative 'brasil_sdk'

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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.bank.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.bank.load({ "id" => "bank_id" })
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.cep.load({ "id" => "cep_id" })
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.cnpj.load({ "id" => "cnpj_id" })
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
ddd = client.ddd
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$ARRAY`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ddd.load({ "id" => "ddd_id" })
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
feriado = client.feriado
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.feriado.load({ "id" => "feriado_id" })
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
fipe_marca = client.fipe_marca
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | ``$STRING`` | No |  |
| `valor` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.fipe_marca.load({ "id" => "fipe_marca_id" })
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.fipe_preco.load({ "id" => "fipe_preco_id" })
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
municipio = client.municipio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | ``$STRING`` | No |  |
| `nome` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.municipio.load({ "id" => "municipio_id" })
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.ufn.list(nil)
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

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ufn2.load({ "id" => "ufn2_id" })
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

