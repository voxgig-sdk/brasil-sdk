# Brasil PHP SDK



The PHP SDK for the Brasil API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Bank()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/brasil-sdk/releases](https://github.com/voxgig-sdk/brasil-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'brasil_sdk.php';

$client = new BrasilSDK();
```

### 2. List bank records

```php
try {
    // list() returns an array of Bank records — iterate directly.
    $banks = $client->Bank()->list();
    foreach ($banks as $item) {
        echo $item["code"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a bank

Bank is nested under code, so provide the `code`.

```php
try {
    // load() returns the bare Bank record (throws on error).
    $bank = $client->Bank()->load(["code" => "example_code"]);
    print_r($bank);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $banks = $client->Bank()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = BrasilSDK::test();

// Entity ops return the bare mock record (throws on error).
$bank = $client->Bank()->list();
print_r($bank);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new BrasilSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
BRASIL_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### BrasilSDK

```php
require_once 'brasil_sdk.php';
$client = new BrasilSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = BrasilSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### BrasilSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Bank` | `($data): BankEntity` | Create a Bank entity instance. |
| `Cep` | `($data): CepEntity` | Create a Cep entity instance. |
| `Cnpj` | `($data): CnpjEntity` | Create a Cnpj entity instance. |
| `Ddd` | `($data): DddEntity` | Create a Ddd entity instance. |
| `Feriado` | `($data): FeriadoEntity` | Create a Feriado entity instance. |
| `FipeMarca` | `($data): FipeMarcaEntity` | Create a FipeMarca entity instance. |
| `FipePreco` | `($data): FipePrecoEntity` | Create a FipePreco entity instance. |
| `Municipio` | `($data): MunicipioEntity` | Create a Municipio entity instance. |
| `Ufn` | `($data): UfnEntity` | Create an Ufn entity instance. |
| `Ufn2` | `($data): Ufn2Entity` | Create an Ufn2 entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Bank

| Field | Description |
| --- | --- |
| `code` |  |
| `full_name` |  |
| `ispb` |  |
| `name` |  |

Operations: List, Load.

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

Operations: Load.

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

Operations: Load.

API path: `/cnpj/v1/{cnpj}`

#### Ddd

| Field | Description |
| --- | --- |
| `city` |  |
| `state` |  |

Operations: Load.

API path: `/ddd/v1/{ddd}`

#### Feriado

| Field | Description |
| --- | --- |
| `date` |  |
| `name` |  |
| `type` |  |

Operations: Load.

API path: `/feriados/v1/{ano}`

#### FipeMarca

| Field | Description |
| --- | --- |
| `nome` |  |
| `valor` |  |

Operations: Load.

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

Operations: Load.

API path: `/fipe/preco/v1/{codigoFipe}`

#### Municipio

| Field | Description |
| --- | --- |
| `codigo_ibge` |  |
| `nome` |  |

Operations: Load.

API path: `/ibge/municipios/v1/{siglaUF}`

#### Ufn

| Field | Description |
| --- | --- |
| `id` |  |
| `nome` |  |
| `regiao` |  |
| `sigla` |  |

Operations: List.

API path: `/ibge/uf/v1`

#### Ufn2

| Field | Description |
| --- | --- |
| `id` |  |
| `nome` |  |
| `regiao` |  |
| `sigla` |  |

Operations: Load.

API path: `/ibge/uf/v1/{siglaUF}`



## Entities


### Bank

Create an instance: `$bank = $client->Bank();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `int` |  |
| `full_name` | `string` |  |
| `ispb` | `string` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Bank record (throws on error).
$bank = $client->Bank()->load(["code" => "code"]);
```

#### Example: List

```php
// list() returns an array of Bank records (throws on error).
$banks = $client->Bank()->list();
```


### Cep

Create an instance: `$cep = $client->Cep();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cep` | `string` |  |
| `city` | `string` |  |
| `location` | `array` |  |
| `neighborhood` | `string` |  |
| `service` | `string` |  |
| `state` | `string` |  |
| `street` | `string` |  |

#### Example: Load

```php
// load() returns the bare Cep record (throws on error).
$cep = $client->Cep()->load(["cep" => "cep"]);
```


### Cnpj

Create an instance: `$cnpj = $client->Cnpj();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bairro` | `string` |  |
| `capital_social` | `float` |  |
| `cep` | `string` |  |
| `cnae_fiscal` | `int` |  |
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
| `qsa` | `array` |  |
| `razao_social` | `string` |  |
| `uf` | `string` |  |

#### Example: Load

```php
// load() returns the bare Cnpj record (throws on error).
$cnpj = $client->Cnpj()->load(["cnpj" => "cnpj"]);
```


### Ddd

Create an instance: `$ddd = $client->Ddd();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `array` |  |
| `state` | `string` |  |

#### Example: Load

```php
// load() returns the bare Ddd record (throws on error).
$ddd = $client->Ddd()->load(["ddd" => "ddd"]);
```


### Feriado

Create an instance: `$feriado = $client->Feriado();`

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

```php
// load() returns the bare Feriado record (throws on error).
$feriado = $client->Feriado()->load(["ano" => 1]);
```


### FipeMarca

Create an instance: `$fipe_marca = $client->FipeMarca();`

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

```php
// load() returns the bare FipeMarca record (throws on error).
$fipe_marca = $client->FipeMarca()->load(["tipo_veiculo" => "tipo_veiculo"]);
```


### FipePreco

Create an instance: `$fipe_preco = $client->FipePreco();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ano_modelo` | `int` |  |
| `codigo_fipe` | `string` |  |
| `combustivel` | `string` |  |
| `marca` | `string` |  |
| `mes_referencia` | `string` |  |
| `modelo` | `string` |  |
| `sigla_combustivel` | `string` |  |
| `tipo_veiculo` | `int` |  |
| `valor` | `string` |  |

#### Example: Load

```php
// load() returns the bare FipePreco record (throws on error).
$fipe_preco = $client->FipePreco()->load(["codigo_fipe" => "codigo_fipe"]);
```


### Municipio

Create an instance: `$municipio = $client->Municipio();`

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

```php
// load() returns the bare Municipio record (throws on error).
$municipio = $client->Municipio()->load(["sigla_uf" => "sigla_uf"]);
```


### Ufn

Create an instance: `$ufn = $client->Ufn();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `string` |  |
| `regiao` | `array` |  |
| `sigla` | `string` |  |

#### Example: List

```php
// list() returns an array of Ufn records (throws on error).
$ufns = $client->Ufn()->list();
```


### Ufn2

Create an instance: `$ufn2 = $client->Ufn2();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `nome` | `string` |  |
| `regiao` | `array` |  |
| `sigla` | `string` |  |

#### Example: Load

```php
// load() returns the bare Ufn2 record (throws on error).
$ufn2 = $client->Ufn2()->load(["sigla_uf" => "sigla_uf"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── brasil_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`brasil_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$bank = $client->Bank();
$bank->list();

// $bank->data_get() now returns the bank data from the last list
// $bank->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
