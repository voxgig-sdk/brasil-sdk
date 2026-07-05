# Brasil Golang SDK Reference

Complete API reference for the Brasil Golang SDK.


## BrasilSDK

### Constructor

```go
func NewBrasilSDK(options map[string]any) *BrasilSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *BrasilSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *BrasilSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Bank(data map[string]any) BrasilEntity`

Create a new `Bank` entity instance. Pass `nil` for no initial data.

#### `Cep(data map[string]any) BrasilEntity`

Create a new `Cep` entity instance. Pass `nil` for no initial data.

#### `Cnpj(data map[string]any) BrasilEntity`

Create a new `Cnpj` entity instance. Pass `nil` for no initial data.

#### `Ddd(data map[string]any) BrasilEntity`

Create a new `Ddd` entity instance. Pass `nil` for no initial data.

#### `Feriado(data map[string]any) BrasilEntity`

Create a new `Feriado` entity instance. Pass `nil` for no initial data.

#### `FipeMarca(data map[string]any) BrasilEntity`

Create a new `FipeMarca` entity instance. Pass `nil` for no initial data.

#### `FipePreco(data map[string]any) BrasilEntity`

Create a new `FipePreco` entity instance. Pass `nil` for no initial data.

#### `Municipio(data map[string]any) BrasilEntity`

Create a new `Municipio` entity instance. Pass `nil` for no initial data.

#### `Ufn(data map[string]any) BrasilEntity`

Create a new `Ufn` entity instance. Pass `nil` for no initial data.

#### `Ufn2(data map[string]any) BrasilEntity`

Create a new `Ufn2` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BankEntity

```go
bank := client.Bank(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `int` | No |  |
| `full_name` | `string` | No |  |
| `ispb` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Bank(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Bank(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BankEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CepEntity

```go
cep := client.Cep(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | `string` | No |  |
| `city` | `string` | No |  |
| `location` | `map[string]any` | No |  |
| `neighborhood` | `string` | No |  |
| `service` | `string` | No |  |
| `state` | `string` | No |  |
| `street` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Cep(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CepEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CnpjEntity

```go
cnpj := client.Cnpj(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | `string` | No |  |
| `capital_social` | `float64` | No |  |
| `cep` | `string` | No |  |
| `cnae_fiscal` | `int` | No |  |
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
| `qsa` | `[]any` | No |  |
| `razao_social` | `string` | No |  |
| `uf` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Cnpj(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CnpjEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DddEntity

```go
ddd := client.Ddd(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `[]any` | No |  |
| `state` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Ddd(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DddEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FeriadoEntity

```go
feriado := client.Feriado(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Feriado(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FeriadoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FipeMarcaEntity

```go
fipe_marca := client.FipeMarca(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `string` | No |  |
| `valor` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FipeMarca(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FipeMarcaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FipePrecoEntity

```go
fipe_preco := client.FipePreco(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ano_modelo` | `int` | No |  |
| `codigo_fipe` | `string` | No |  |
| `combustivel` | `string` | No |  |
| `marca` | `string` | No |  |
| `mes_referencia` | `string` | No |  |
| `modelo` | `string` | No |  |
| `sigla_combustivel` | `string` | No |  |
| `tipo_veiculo` | `int` | No |  |
| `valor` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FipePreco(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FipePrecoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MunicipioEntity

```go
municipio := client.Municipio(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `string` | No |  |
| `nome` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Municipio(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MunicipioEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UfnEntity

```go
ufn := client.Ufn(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `map[string]any` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Ufn(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UfnEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Ufn2Entity

```go
ufn2 := client.Ufn2(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `map[string]any` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Ufn2(nil).Load(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `Ufn2Entity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewBrasilSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

