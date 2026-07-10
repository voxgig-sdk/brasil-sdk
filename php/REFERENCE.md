# Brasil PHP SDK Reference

Complete API reference for the Brasil PHP SDK.


## BrasilSDK

### Constructor

```php
require_once __DIR__ . '/brasil_sdk.php';

$client = new BrasilSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BrasilSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = BrasilSDK::test();
```


### Instance Methods

#### `Bank($data = null)`

Create a new `BankEntity` instance. Pass `null` for no initial data.

#### `Cep($data = null)`

Create a new `CepEntity` instance. Pass `null` for no initial data.

#### `Cnpj($data = null)`

Create a new `CnpjEntity` instance. Pass `null` for no initial data.

#### `Ddd($data = null)`

Create a new `DddEntity` instance. Pass `null` for no initial data.

#### `Feriado($data = null)`

Create a new `FeriadoEntity` instance. Pass `null` for no initial data.

#### `FipeMarca($data = null)`

Create a new `FipeMarcaEntity` instance. Pass `null` for no initial data.

#### `FipePreco($data = null)`

Create a new `FipePrecoEntity` instance. Pass `null` for no initial data.

#### `Municipio($data = null)`

Create a new `MunicipioEntity` instance. Pass `null` for no initial data.

#### `Ufn($data = null)`

Create a new `UfnEntity` instance. Pass `null` for no initial data.

#### `Ufn2($data = null)`

Create a new `Ufn2Entity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): BrasilUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BankEntity

```php
$bank = $client->Bank();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `int` | No |  |
| `full_name` | `string` | No |  |
| `ispb` | `string` | No |  |
| `name` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Bank()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Bank()->load(["code" => "code"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BankEntity`

Create a new `BankEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CepEntity

```php
$cep = $client->Cep();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cep` | `string` | No |  |
| `city` | `string` | No |  |
| `location` | `array` | No |  |
| `neighborhood` | `string` | No |  |
| `service` | `string` | No |  |
| `state` | `string` | No |  |
| `street` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Cep()->load(["cep" => "cep"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CepEntity`

Create a new `CepEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CnpjEntity

```php
$cnpj = $client->Cnpj();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | `string` | No |  |
| `capital_social` | `float` | No |  |
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
| `qsa` | `array` | No |  |
| `razao_social` | `string` | No |  |
| `uf` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Cnpj()->load(["cnpj" => "cnpj"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CnpjEntity`

Create a new `CnpjEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DddEntity

```php
$ddd = $client->Ddd();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `array` | No |  |
| `state` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Ddd()->load(["ddd" => "ddd"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DddEntity`

Create a new `DddEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FeriadoEntity

```php
$feriado = $client->Feriado();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Feriado()->load(["ano" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FeriadoEntity`

Create a new `FeriadoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FipeMarcaEntity

```php
$fipe_marca = $client->FipeMarca();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `string` | No |  |
| `valor` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FipeMarca()->load(["tipo_veiculo" => "tipo_veiculo"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FipeMarcaEntity`

Create a new `FipeMarcaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FipePrecoEntity

```php
$fipe_preco = $client->FipePreco();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FipePreco()->load(["codigo_fipe" => "codigo_fipe"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FipePrecoEntity`

Create a new `FipePrecoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MunicipioEntity

```php
$municipio = $client->Municipio();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `string` | No |  |
| `nome` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Municipio()->load(["sigla_uf" => "sigla_uf"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MunicipioEntity`

Create a new `MunicipioEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UfnEntity

```php
$ufn = $client->Ufn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `array` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Ufn()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UfnEntity`

Create a new `UfnEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Ufn2Entity

```php
$ufn2 = $client->Ufn2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `nome` | `string` | No |  |
| `regiao` | `array` | No |  |
| `sigla` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Ufn2()->load(["sigla_uf" => "sigla_uf"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): Ufn2Entity`

Create a new `Ufn2Entity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new BrasilSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

