# Brasil Python SDK Reference

Complete API reference for the Brasil Python SDK.


## BrasilSDK

### Constructor

```python
from brasil_sdk import BrasilSDK

client = BrasilSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `BrasilSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = BrasilSDK.test()
```


### Instance Methods

#### `Bank(data=None)`

Create a new `BankEntity` instance. Pass `None` for no initial data.

#### `Cep(data=None)`

Create a new `CepEntity` instance. Pass `None` for no initial data.

#### `Cnpj(data=None)`

Create a new `CnpjEntity` instance. Pass `None` for no initial data.

#### `Ddd(data=None)`

Create a new `DddEntity` instance. Pass `None` for no initial data.

#### `Feriado(data=None)`

Create a new `FeriadoEntity` instance. Pass `None` for no initial data.

#### `FipeMarca(data=None)`

Create a new `FipeMarcaEntity` instance. Pass `None` for no initial data.

#### `FipePreco(data=None)`

Create a new `FipePrecoEntity` instance. Pass `None` for no initial data.

#### `Municipio(data=None)`

Create a new `MunicipioEntity` instance. Pass `None` for no initial data.

#### `Ufn(data=None)`

Create a new `UfnEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## BankEntity

```python
bank = client.Bank()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `int` | No | Código do banco |
| `fullName` | `str` | No | Nome completo do banco |
| `ispb` | `str` | No | Identificador único do banco |
| `name` | `str` | No | Nome do banco |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Bank().list()
for bank in results:
    print(bank)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Bank().load({"code": "code"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BankEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CepEntity

```python
cep = client.Cep()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `coordinates` | `dict` | No |  |
| `type` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cep().load({"cep": "cep"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CepEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CnpjEntity

```python
cnpj = client.Cnpj()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bairro` | `str` | No | Bairro |
| `capital_social` | `float` | No | Capital social da empresa |
| `cep` | `str` | No | CEP |
| `cnae_fiscal` | `int` | No | CNAE fiscal principal |
| `cnae_fiscal_descricao` | `str` | No | Descrição do CNAE fiscal |
| `cnpj` | `str` | No | CNPJ consultado |
| `complemento` | `str` | No | Complemento do endereço |
| `data_inicio_atividade` | `str` | No | Data de início das atividades |
| `ddd_telefone_1` | `str` | No | Telefone principal |
| `logradouro` | `str` | No | Logradouro do endereço |
| `municipio` | `str` | No | Município |
| `natureza_juridica` | `str` | No | Código da natureza jurídica |
| `nome_fantasia` | `str` | No | Nome fantasia da empresa |
| `numero` | `str` | No | Número do endereço |
| `porte` | `str` | No | Porte da empresa |
| `qsa` | `list` | No | Quadro de sócios e administradores |
| `razao_social` | `str` | No | Razão social da empresa |
| `uf` | `str` | No | UF |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cnpj().load({"cnpj": "cnpj"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CnpjEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DddEntity

```python
ddd = client.Ddd()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cities` | `list` | No | Lista de cidades com este DDD |
| `state` | `str` | No | Sigla do estado |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Ddd().load({"ddd": "ddd"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DddEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FeriadoEntity

```python
feriado = client.Feriado()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | No | Data do feriado |
| `name` | `str` | No | Nome do feriado |
| `type` | `str` | No | Tipo de feriado |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Feriado().load({"ano": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeriadoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FipeMarcaEntity

```python
fipe_marca = client.FipeMarca()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `nome` | `str` | No | Nome da marca |
| `valor` | `str` | No | Código da marca |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FipeMarca().load({"tipo_veiculo": "tipo_veiculo"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FipeMarcaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FipePrecoEntity

```python
fipe_preco = client.FipePreco()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `anoModelo` | `int` | No | Ano do modelo |
| `codigoFipe` | `str` | No | Código FIPE |
| `combustivel` | `str` | No | Tipo de combustível |
| `marca` | `str` | No | Marca do veículo |
| `mesReferencia` | `str` | No | Mês de referência da tabela |
| `modelo` | `str` | No | Modelo do veículo |
| `siglaCombustivel` | `str` | No | Sigla do combustível |
| `tipoVeiculo` | `int` | No | Tipo do veículo |
| `valor` | `str` | No | Valor do veículo |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FipePreco().load({"codigo_fipe": "codigo_fipe"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FipePrecoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MunicipioEntity

```python
municipio = client.Municipio()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `codigo_ibge` | `str` | No | Código IBGE do município |
| `nome` | `str` | No | Nome do município |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Municipio().load({"sigla_uf": "sigla_uf"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MunicipioEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UfnEntity

```python
ufn = client.Ufn()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | ID da UF |
| `nome` | `str` | No | Nome da UF |
| `regiao` | `dict` | No |  |
| `sigla` | `str` | No | Sigla da UF |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ufn().list()
for ufn in results:
    print(ufn)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Ufn().load({"sigla_uf": "sigla_uf"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UfnEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```python
client = BrasilSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
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

