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
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## BankEntity

```php
$bank = $client->Bank();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | ``$INTEGER`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `ispb` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Bank()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Bank()->load(["id" => "bank_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): BankEntity`

Create a new `BankEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CepEntity

```php
$cep = $client->Cep();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Cep()->load(["id" => "cep_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CepEntity`

Create a new `CepEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CnpjEntity

```php
$cnpj = $client->Cnpj();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Cnpj()->load(["id" => "cnpj_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CnpjEntity`

Create a new `CnpjEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DddEntity

```php
$ddd = $client->Ddd();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$ARRAY`` | No |  |
| `state` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Ddd()->load(["id" => "ddd_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DddEntity`

Create a new `DddEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FeriadoEntity

```php
$feriado = $client->Feriado();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Feriado()->load(["id" => "feriado_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FeriadoEntity`

Create a new `FeriadoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FipeMarcaEntity

```php
$fipe_marca = $client->FipeMarca();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | ``$STRING`` | No |  |
| `valor` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->FipeMarca()->load(["id" => "fipe_marca_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FipeMarcaEntity`

Create a new `FipeMarcaEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FipePrecoEntity

```php
$fipe_preco = $client->FipePreco();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->FipePreco()->load(["id" => "fipe_preco_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FipePrecoEntity`

Create a new `FipePrecoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MunicipioEntity

```php
$municipio = $client->Municipio();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | ``$STRING`` | No |  |
| `nome` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Municipio()->load(["id" => "municipio_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MunicipioEntity`

Create a new `MunicipioEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UfnEntity

```php
$ufn = $client->Ufn();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Ufn()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UfnEntity`

Create a new `UfnEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Ufn2Entity

```php
$ufn2 = $client->Ufn2();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `nome` | ``$STRING`` | No |  |
| `regiao` | ``$OBJECT`` | No |  |
| `sigla` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Ufn2()->load(["id" => "ufn2_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): Ufn2Entity`

Create a new `Ufn2Entity` instance with the same client and
options.

#### `getName(): string`

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

