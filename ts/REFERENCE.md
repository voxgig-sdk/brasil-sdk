# Brasil TypeScript SDK Reference

Complete API reference for the Brasil TypeScript SDK.


## BrasilSDK

### Constructor

```ts
new BrasilSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BrasilSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = BrasilSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `BrasilSDK` instance in test mode.


### Instance Methods

#### `Bank(data?: object)`

Create a new `Bank` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BankEntity` instance.

#### `Cep(data?: object)`

Create a new `Cep` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CepEntity` instance.

#### `Cnpj(data?: object)`

Create a new `Cnpj` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CnpjEntity` instance.

#### `Ddd(data?: object)`

Create a new `Ddd` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DddEntity` instance.

#### `Feriado(data?: object)`

Create a new `Feriado` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FeriadoEntity` instance.

#### `FipeMarca(data?: object)`

Create a new `FipeMarca` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FipeMarcaEntity` instance.

#### `FipePreco(data?: object)`

Create a new `FipePreco` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FipePrecoEntity` instance.

#### `Municipio(data?: object)`

Create a new `Municipio` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MunicipioEntity` instance.

#### `Ufn(data?: object)`

Create a new `Ufn` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UfnEntity` instance.

#### `Ufn2(data?: object)`

Create a new `Ufn2` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Ufn2Entity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `BrasilSDK.test()`.

**Returns:** `BrasilSDK` instance in test mode.


---

## BankEntity

```ts
const bank = client.Bank()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `number` | No |  |
| `full_name` | `string` | No |  |
| `ispb` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Bank().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Bank().load({ code: 'code' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BankEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CepEntity

```ts
const cep = client.Cep()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | `string` | No |  |
| `city` | `string` | No |  |
| `location` | `Record<string, any>` | No |  |
| `neighborhood` | `string` | No |  |
| `service` | `string` | No |  |
| `state` | `string` | No |  |
| `street` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cep().load({ cep: 'cep' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CepEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CnpjEntity

```ts
const cnpj = client.Cnpj()
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
| `qsa` | `any[]` | No |  |
| `razao_social` | `string` | No |  |
| `uf` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cnpj().load({ cnpj: 'cnpj' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CnpjEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DddEntity

```ts
const ddd = client.Ddd()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `any[]` | No |  |
| `state` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Ddd().load({ ddd: 'ddd' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DddEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FeriadoEntity

```ts
const feriado = client.Feriado()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Feriado().load({ ano: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FeriadoEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FipeMarcaEntity

```ts
const fipe_marca = client.FipeMarca()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `string` | No |  |
| `valor` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FipeMarca().load({ tipo_veiculo: 'tipo_veiculo' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FipeMarcaEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FipePrecoEntity

```ts
const fipe_preco = client.FipePreco()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FipePreco().load({ codigo_fipe: 'codigo_fipe' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FipePrecoEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MunicipioEntity

```ts
const municipio = client.Municipio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `string` | No |  |
| `nome` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Municipio().load({ sigla_uf: 'sigla_uf' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MunicipioEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UfnEntity

```ts
const ufn = client.Ufn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `Record<string, any>` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ufn().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UfnEntity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Ufn2Entity

```ts
const ufn2 = client.Ufn2()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `Record<string, any>` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Ufn2().load({ sigla_uf: 'sigla_uf' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Ufn2Entity` instance with the same client and
options.

#### `client()`

Return the parent `BrasilSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new BrasilSDK({
  feature: {
    test: { active: true },
  }
})
```

