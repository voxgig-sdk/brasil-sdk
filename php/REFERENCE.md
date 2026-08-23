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
| `code` | `int` | No | Código do banco |
| `fullName` | `string` | No | Nome completo do banco |
| `ispb` | `string` | No | Identificador único do banco |
| `name` | `string` | No | Nome do banco |

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
| `coordinates` | `array` | No |  |
| `type` | `string` | No |  |

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
| `bairro` | `string` | No | Bairro |
| `capital_social` | `float` | No | Capital social da empresa |
| `cep` | `string` | No | CEP |
| `cnae_fiscal` | `int` | No | CNAE fiscal principal |
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
| `qsa` | `array` | No | Quadro de sócios e administradores |
| `razao_social` | `string` | No | Razão social da empresa |
| `uf` | `string` | No | UF |

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
| `cities` | `array` | No | Lista de cidades com este DDD |
| `state` | `string` | No | Sigla do estado |

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
| `date` | `string` | No | Data do feriado |
| `name` | `string` | No | Nome do feriado |
| `type` | `string` | No | Tipo de feriado |

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
| `nome` | `string` | No | Nome da marca |
| `valor` | `string` | No | Código da marca |

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
| `anoModelo` | `int` | No | Ano do modelo |
| `codigoFipe` | `string` | No | Código FIPE |
| `combustivel` | `string` | No | Tipo de combustível |
| `marca` | `string` | No | Marca do veículo |
| `mesReferencia` | `string` | No | Mês de referência da tabela |
| `modelo` | `string` | No | Modelo do veículo |
| `siglaCombustivel` | `string` | No | Sigla do combustível |
| `tipoVeiculo` | `int` | No | Tipo do veículo |
| `valor` | `string` | No | Valor do veículo |

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
| `codigo_ibge` | `string` | No | Código IBGE do município |
| `nome` | `string` | No | Nome do município |

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
| `id` | `int` | No | ID da UF |
| `nome` | `string` | No | Nome da UF |
| `regiao` | `array` | No |  |
| `sigla` | `string` | No | Sigla da UF |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Ufn()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Ufn()->load(["sigla_uf" => "sigla_uf"]);
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

