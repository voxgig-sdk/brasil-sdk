# Brasil TypeScript SDK



The TypeScript SDK for the Brasil API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Bank()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/brasil-sdk/releases](https://github.com/voxgig-sdk/brasil-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { BrasilSDK } from '@voxgig-sdk/brasil'

const client = new BrasilSDK()
```

### 2. List bank records

`list()` resolves to an array of Bank objects — iterate it directly:

```ts
const banks = await client.Bank().list()

for (const bank of banks) {
  console.log(bank)
}
```

### 3. Load a bank

Bank is nested under code, so provide the `code`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const bank = await client.Bank().load({
    code: 'example_code',
  })
  console.log(bank)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const banks = await client.Bank().list()
  console.log(banks)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = BrasilSDK.test()

const bank = await client.Bank().list()
// bank is a bare entity populated with mock response data
console.log(bank)
```

You can also use the instance method:

```ts
const client = new BrasilSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Bank()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new BrasilSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
BRASIL_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### BrasilSDK

#### Constructor

```ts
new BrasilSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Bank(data?)` | `BankEntity` | Create a Bank entity instance. |
| `Cep(data?)` | `CepEntity` | Create a Cep entity instance. |
| `Cnpj(data?)` | `CnpjEntity` | Create a Cnpj entity instance. |
| `Ddd(data?)` | `DddEntity` | Create a Ddd entity instance. |
| `Feriado(data?)` | `FeriadoEntity` | Create a Feriado entity instance. |
| `FipeMarca(data?)` | `FipeMarcaEntity` | Create a FipeMarca entity instance. |
| `FipePreco(data?)` | `FipePrecoEntity` | Create a FipePreco entity instance. |
| `Municipio(data?)` | `MunicipioEntity` | Create a Municipio entity instance. |
| `Ufn(data?)` | `UfnEntity` | Create an Ufn entity instance. |
| `Ufn2(data?)` | `Ufn2Entity` | Create an Ufn2 entity instance. |
| `tester(testopts?, sdkopts?)` | `BrasilSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `BrasilSDK.test(testopts?, sdkopts?)` | `BrasilSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): BrasilSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Bank

| Field | Description |
| --- | --- |
| `code` |  |
| `full_name` |  |
| `ispb` |  |
| `name` |  |

Operations: list, load.

API path: `/banks/v1`

#### Cep

| Field | Description |
| --- | --- |
| `cep` |  |
| `city` |  |
| `location` |  |
| `neighborhood` |  |
| `service` |  |
| `state` |  |
| `street` |  |

Operations: load.

API path: `/cep/v1/{cep}`

#### Cnpj

| Field | Description |
| --- | --- |
| `bairro` |  |
| `capital_social` |  |
| `cep` |  |
| `cnae_fiscal` |  |
| `cnae_fiscal_descricao` |  |
| `cnpj` |  |
| `complemento` |  |
| `data_inicio_atividade` |  |
| `ddd_telefone_1` |  |
| `logradouro` |  |
| `municipio` |  |
| `natureza_juridica` |  |
| `nome_fantasia` |  |
| `numero` |  |
| `porte` |  |
| `qsa` |  |
| `razao_social` |  |
| `uf` |  |

Operations: load.

API path: `/cnpj/v1/{cnpj}`

#### Ddd

| Field | Description |
| --- | --- |
| `city` |  |
| `state` |  |

Operations: load.

API path: `/ddd/v1/{ddd}`

#### Feriado

| Field | Description |
| --- | --- |
| `date` |  |
| `name` |  |
| `type` |  |

Operations: load.

API path: `/feriados/v1/{ano}`

#### FipeMarca

| Field | Description |
| --- | --- |
| `nome` |  |
| `valor` |  |

Operations: load.

API path: `/fipe/marcas/v1/{tipoVeiculo}`

#### FipePreco

| Field | Description |
| --- | --- |
| `ano_modelo` |  |
| `codigo_fipe` |  |
| `combustivel` |  |
| `marca` |  |
| `mes_referencia` |  |
| `modelo` |  |
| `sigla_combustivel` |  |
| `tipo_veiculo` |  |
| `valor` |  |

Operations: load.

API path: `/fipe/preco/v1/{codigoFipe}`

#### Municipio

| Field | Description |
| --- | --- |
| `codigo_ibge` |  |
| `nome` |  |

Operations: load.

API path: `/ibge/municipios/v1/{siglaUF}`

#### Ufn

| Field | Description |
| --- | --- |
| `id` |  |
| `nome` |  |
| `regiao` |  |
| `sigla` |  |

Operations: list.

API path: `/ibge/uf/v1`

#### Ufn2

| Field | Description |
| --- | --- |
| `id` |  |
| `nome` |  |
| `regiao` |  |
| `sigla` |  |

Operations: load.

API path: `/ibge/uf/v1/{siglaUF}`



## Entities


### Bank

Create an instance: `const bank = client.Bank()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `number` |  |
| `full_name` | `string` |  |
| `ispb` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```ts
const bank = await client.Bank().load({ code: 'code' })
```

#### Example: List

```ts
const banks = await client.Bank().list()
```


### Cep

Create an instance: `const cep = client.Cep()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cep` | `string` |  |
| `city` | `string` |  |
| `location` | `Record<string, any>` |  |
| `neighborhood` | `string` |  |
| `service` | `string` |  |
| `state` | `string` |  |
| `street` | `string` |  |

#### Example: Load

```ts
const cep = await client.Cep().load({ cep: 'cep' })
```


### Cnpj

Create an instance: `const cnpj = client.Cnpj()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bairro` | `string` |  |
| `capital_social` | `number` |  |
| `cep` | `string` |  |
| `cnae_fiscal` | `number` |  |
| `cnae_fiscal_descricao` | `string` |  |
| `cnpj` | `string` |  |
| `complemento` | `string` |  |
| `data_inicio_atividade` | `string` |  |
| `ddd_telefone_1` | `string` |  |
| `logradouro` | `string` |  |
| `municipio` | `string` |  |
| `natureza_juridica` | `string` |  |
| `nome_fantasia` | `string` |  |
| `numero` | `string` |  |
| `porte` | `string` |  |
| `qsa` | `any[]` |  |
| `razao_social` | `string` |  |
| `uf` | `string` |  |

#### Example: Load

```ts
const cnpj = await client.Cnpj().load({ cnpj: 'cnpj' })
```


### Ddd

Create an instance: `const ddd = client.Ddd()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `any[]` |  |
| `state` | `string` |  |

#### Example: Load

```ts
const ddd = await client.Ddd().load({ ddd: 'ddd' })
```


### Feriado

Create an instance: `const feriado = client.Feriado()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const feriado = await client.Feriado().load({ ano: 1 })
```


### FipeMarca

Create an instance: `const fipe_marca = client.FipeMarca()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `nome` | `string` |  |
| `valor` | `string` |  |

#### Example: Load

```ts
const fipe_marca = await client.FipeMarca().load({ tipo_veiculo: 'tipo_veiculo' })
```


### FipePreco

Create an instance: `const fipe_preco = client.FipePreco()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ano_modelo` | `number` |  |
| `codigo_fipe` | `string` |  |
| `combustivel` | `string` |  |
| `marca` | `string` |  |
| `mes_referencia` | `string` |  |
| `modelo` | `string` |  |
| `sigla_combustivel` | `string` |  |
| `tipo_veiculo` | `number` |  |
| `valor` | `string` |  |

#### Example: Load

```ts
const fipe_preco = await client.FipePreco().load({ codigo_fipe: 'codigo_fipe' })
```


### Municipio

Create an instance: `const municipio = client.Municipio()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `codigo_ibge` | `string` |  |
| `nome` | `string` |  |

#### Example: Load

```ts
const municipio = await client.Municipio().load({ sigla_uf: 'sigla_uf' })
```


### Ufn

Create an instance: `const ufn = client.Ufn()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `nome` | `string` |  |
| `regiao` | `Record<string, any>` |  |
| `sigla` | `string` |  |

#### Example: List

```ts
const ufns = await client.Ufn().list()
```


### Ufn2

Create an instance: `const ufn2 = client.Ufn2()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `nome` | `string` |  |
| `regiao` | `Record<string, any>` |  |
| `sigla` | `string` |  |

#### Example: Load

```ts
const ufn2 = await client.Ufn2().load({ sigla_uf: 'sigla_uf' })
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
brasil/
├── src/
│   ├── BrasilSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { BrasilSDK } from '@voxgig-sdk/brasil'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const bank = client.Bank()
await bank.list()

// bank.data() now returns the bank data from the last `list`
// bank.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
