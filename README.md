# Brasil SDK

Programmatic access to Brazilian public data — CEPs, banks, CNPJ, IBGE, holidays, FIPE tables and more

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Brasil API

[BrasilAPI](https://brasilapi.com.br/) is a community-maintained Brazilian initiative that centralises public-sector data behind a single, modern HTTPS API with low latency and CORS enabled. It exists to make information that is otherwise scattered across legacy government sites — Correios CEPs, the Central Bank of Brazil's bank registry, IBGE municipality lists, national holidays, FIPE vehicle pricing tables and more — accessible from any client without an API key.

What you can look up:
- Brazilian postal codes (`CEP`) and the address they map to
- Bank registry entries from the Central Bank of Brazil
- Companies by `CNPJ`
- Telephone area codes (`DDD`) and the cities they cover
- National holidays for a given year
- FIPE vehicle brands and reference prices
- IBGE municipalities and Brazilian states (`UF`)

All endpoints are read-only `GET` requests served from `https://brasilapi.com.br/api`. No authentication is required and responses are JSON. Data is sourced from upstream public registries (Correios, Banco Central, IBGE, FIPE, etc.); BrasilAPI proxies and normalises these sources, so freshness depends on the underlying authority.

## Try it

**TypeScript**
```bash
npm install brasil
```

**Python**
```bash
pip install brasil-sdk
```

**PHP**
```bash
composer require voxgig/brasil-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/brasil-sdk/go
```

**Ruby**
```bash
gem install brasil-sdk
```

**Lua**
```bash
luarocks install brasil-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { BrasilSDK } from 'brasil'

const client = new BrasilSDK({})

// List all banks
const banks = await client.Bank().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o brasil-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "brasil": {
      "command": "/abs/path/to/brasil-mcp"
    }
  }
}
```

## Entities

The API exposes 10 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Bank** | Brazilian banks registered with the Central Bank of Brazil, looked up by code (e.g. `/banks/v1`, `/banks/v1/{code}`). | `/banks/v1` |
| **Cep** | Brazilian postal code (Código de Endereçamento Postal) resolution to street, neighbourhood, city and state (e.g. `/cep/v1/{cep}`, `/cep/v2/{cep}`). | `/cep/v1/{cep}` |
| **Cnpj** | Brazilian company registration (Cadastro Nacional da Pessoa Jurídica) lookup by tax ID (e.g. `/cnpj/v1/{cnpj}`). | `/cnpj/v1/{cnpj}` |
| **Ddd** | Brazilian telephone area codes (Discagem Direta à Distância) and the cities they cover (e.g. `/ddd/v1/{ddd}`). | `/ddd/v1/{ddd}` |
| **Feriado** | Brazilian national holidays for a given year (e.g. `/feriados/v1/{ano}`). | `/feriados/v1/{ano}` |
| **FipeMarca** | Vehicle brands from the FIPE (Fundação Instituto de Pesquisas Econômicas) reference tables, segmented by vehicle type (e.g. `/fipe/marcas/v1/{tipoVeiculo}`). | `/fipe/marcas/v1/{tipoVeiculo}` |
| **FipePreco** | FIPE reference prices for vehicles by FIPE code (e.g. `/fipe/preco/v1/{codigoFipe}`). | `/fipe/preco/v1/{codigoFipe}` |
| **Municipio** | Brazilian municipalities sourced from IBGE, listed by state code (e.g. `/ibge/municipios/v1/{siglaUF}`). | `/ibge/municipios/v1/{siglaUF}` |
| **Ufn** | Brazilian federative units (states) — listings and lookup by code or abbreviation via the IBGE UF endpoints. | `/ibge/uf/v1` |
| **Ufn2** | Alternate-version Brazilian federative unit endpoints exposing UF information from the IBGE dataset. | `/ibge/uf/v1/{siglaUF}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from brasil_sdk import BrasilSDK

client = BrasilSDK({})

# List all banks
banks, err = client.Bank(None).list(None, None)

# Load a specific bank
bank, err = client.Bank(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'brasil_sdk.php';

$client = new BrasilSDK([]);

// List all banks
[$banks, $err] = $client->Bank(null)->list(null, null);

// Load a specific bank
[$bank, $err] = $client->Bank(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/brasil-sdk/go"

client := sdk.NewBrasilSDK(map[string]any{})

// List all banks
banks, err := client.Bank(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Brasil_sdk"

client = BrasilSDK.new({})

# List all banks
banks, err = client.Bank(nil).list(nil, nil)

# Load a specific bank
bank, err = client.Bank(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("brasil_sdk")

local client = sdk.new({})

-- List all banks
local banks, err = client:Bank(nil):list(nil, nil)

-- Load a specific bank
local bank, err = client:Bank(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = BrasilSDK.test()
const result = await client.Bank().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = BrasilSDK.test(None, None)
result, err = client.Bank(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = BrasilSDK::test(null, null);
[$result, $err] = $client->Bank(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Bank(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BrasilSDK.test(nil, nil)
result, err = client.Bank(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Bank(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Brasil API

- Upstream: [https://brasilapi.com.br/](https://brasilapi.com.br/)
- API docs: [https://brasilapi.com.br/docs](https://brasilapi.com.br/docs)

- MIT licensed, open-source community project maintained by Brazilian developers.
- No API key or authentication required; CORS is enabled for browser clients.
- The project asks consumers to avoid bulk/sequential scraping or high-volume automated crawling and to make requests that reflect genuine user need.
- Service is still evolving — formal Terms of Service are being developed and availability is best-effort.

---

Generated from the Brasil API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
