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
const bank = client.bank
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$INTEGER`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `ispb` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.bank.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.bank.load({ id: 'bank_id' })
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
const cep = client.cep
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.cep.load({ id: 'cep_id' })
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
const cnpj = client.cnpj
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.cnpj.load({ id: 'cnpj_id' })
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
const ddd = client.ddd
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$ARRAY`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ddd.load({ id: 'ddd_id' })
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
const feriado = client.feriado
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.feriado.load({ id: 'feriado_id' })
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
const fipe_marca = client.fipe_marca
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | ``$STRING`` | No |  |
| `valor` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.fipe_marca.load({ id: 'fipe_marca_id' })
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
const fipe_preco = client.fipe_preco
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.fipe_preco.load({ id: 'fipe_preco_id' })
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
const municipio = client.municipio
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | ``$STRING`` | No |  |
| `nome` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.municipio.load({ id: 'municipio_id' })
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
const ufn = client.ufn
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ufn.list()
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
const ufn2 = client.ufn2
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ufn2.load({ id: 'ufn2_id' })
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

