# Brasil SDK

Brasil API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { BrasilSDK } from 'brasil'

const client = new BrasilSDK({
  apikey: process.env.BRASIL_APIKEY,
})

// List all banks
const banks = await client.Bank().list()
console.log(banks.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Bank** |  | `/banks/v1` |
| **Cep** |  | `/cep/v1/{cep}` |
| **Cnpj** |  | `/cnpj/v1/{cnpj}` |
| **Ddd** |  | `/ddd/v1/{ddd}` |
| **Feriado** |  | `/feriados/v1/{ano}` |
| **FipeMarca** |  | `/fipe/marcas/v1/{tipoVeiculo}` |
| **FipePreco** |  | `/fipe/preco/v1/{codigoFipe}` |
| **Municipio** |  | `/ibge/municipios/v1/{siglaUF}` |
| **Ufn** |  | `/ibge/uf/v1` |
| **Ufn2** |  | `/ibge/uf/v1/{siglaUF}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from brasil_sdk import BrasilSDK

client = BrasilSDK({
    "apikey": os.environ.get("BRASIL_APIKEY"),
})

# List all banks
banks, err = client.Bank().list()
print(banks)

# Load a specific bank
bank, err = client.Bank().load({"id": "example_id"})
print(bank)
```

### PHP

```php
<?php
require_once 'brasil_sdk.php';

$client = new BrasilSDK([
    "apikey" => getenv("BRASIL_APIKEY"),
]);

// List all banks
[$banks, $err] = $client->Bank()->list();
print_r($banks);

// Load a specific bank
[$bank, $err] = $client->Bank()->load(["id" => "example_id"]);
print_r($bank);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/brasil-sdk/go"

client := sdk.NewBrasilSDK(map[string]any{
    "apikey": os.Getenv("BRASIL_APIKEY"),
})

// List all banks
banks, err := client.Bank(nil).List(nil, nil)
fmt.Println(banks)
```

### Ruby

```ruby
require_relative "Brasil_sdk"

client = BrasilSDK.new({
  "apikey" => ENV["BRASIL_APIKEY"],
})

# List all banks
banks, err = client.Bank().list
puts banks

# Load a specific bank
bank, err = client.Bank().load({ "id" => "example_id" })
puts bank
```

### Lua

```lua
local sdk = require("brasil_sdk")

local client = sdk.new({
  apikey = os.getenv("BRASIL_APIKEY"),
})

-- List all banks
local banks, err = client:Bank():list()
print(banks)

-- Load a specific bank
local bank, err = client:Bank():load({ id = "example_id" })
print(bank)
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
client = BrasilSDK.test()
result, err = client.Bank().load({"id": "test01"})
```

### PHP

```php
$client = BrasilSDK::test();
[$result, $err] = $client->Bank()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Bank(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = BrasilSDK.test
result, err = client.Bank().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Bank():load({ id = "test01" })
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

---

Generated from the Brasil API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
