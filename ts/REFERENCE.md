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
| `code` | `number` | No | Código do banco |
| `fullName` | `string` | No | Nome completo do banco |
| `ispb` | `string` | No | Identificador único do banco |
| `name` | `string` | No | Nome do banco |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `v1` | `/banks/v1` | `client.Bank().list({ $action: 'v1', ... })` |

An action returns that action's OWN response, which is not necessarily a
Bank record — check the API definition for its shape.

```ts
const result = await client.Bank().list({
  $action: 'v1',
  /* ...the action's own arguments */
})
```

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
| `coordinates` | `Record<string, any>` | No |  |
| `type` | `string` | No |  |

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
| `qsa` | `any[]` | No | Quadro de sócios e administradores |
| `razao_social` | `string` | No | Razão social da empresa |
| `uf` | `string` | No | UF |

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
| `cities` | `any[]` | No | Lista de cidades com este DDD |
| `state` | `string` | No | Sigla do estado |

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
| `date` | `string` | No | Data do feriado |
| `name` | `string` | No | Nome do feriado |
| `type` | `string` | No | Tipo de feriado |

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
| `nome` | `string` | No | Nome da marca |
| `valor` | `string` | No | Código da marca |

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
| `codigo_ibge` | `string` | No | Código IBGE do município |
| `nome` | `string` | No | Nome do município |

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
| `id` | `number` | No | ID da UF |
| `nome` | `string` | No | Nome da UF |
| `regiao` | `Record<string, any>` | No |  |
| `sigla` | `string` | No | Sigla da UF |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `v1` | `/ibge/uf/v1` | `client.Ufn().list({ $action: 'v1', ... })` |

An action returns that action's OWN response, which is not necessarily a
Ufn record — check the API definition for its shape.

```ts
const result = await client.Ufn().list({
  $action: 'v1',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ufn().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Ufn().load({ sigla_uf: 'sigla_uf' })
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

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new BrasilSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

