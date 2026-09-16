# Brasil API

Acesso programático de informações relacionadas a CEPs, bancos, CNPJ, IBGE, feriados nacionais, tabela FIPE e muito mais, fornecendo endpoints modernos com baixa latência. Este projeto busca centralizar dados públicos para uma fácil e rápida consulta em aplicações.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 9 entities and 12 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Bank

Results: Lista de bancos retornada com sucesso; Banco encontrado com sucesso.

SDK operations: `list`, `load`.

Key fields to recognise:

- `code`: Código do banco
- `fullName`: Nome completo do banco
- `ispb`: Identificador único do banco
- `name`: Nome do banco

### Cep

Results: CEP encontrado com sucesso.

SDK operations: `load`.

### Cnpj

Results: CNPJ encontrado com sucesso.

SDK operations: `load`.

Key fields to recognise:

- `bairro`: Bairro
- `capital_social`: Capital social da empresa
- `cep`: CEP
- `cnae_fiscal`: CNAE fiscal principal
- `cnae_fiscal_descricao`: Descrição do CNAE fiscal

### Ddd

Results: DDD encontrado com sucesso.

SDK operations: `load`.

Key fields to recognise:

- `cities`: Lista de cidades com este DDD
- `state`: Sigla do estado

### Feriado

Results: Lista de feriados retornada com sucesso.

SDK operations: `load`.

Key fields to recognise:

- `date`: Data do feriado
- `name`: Nome do feriado
- `type`: Tipo de feriado

### FipeMarca

Results: Lista de marcas retornada com sucesso.

SDK operations: `load`.

Key fields to recognise:

- `nome`: Nome da marca
- `valor`: Código da marca

### FipePreco

Results: Preço encontrado com sucesso.

SDK operations: `load`.

Key fields to recognise:

- `anoModelo`: Ano do modelo
- `codigoFipe`: Código FIPE
- `combustivel`: Tipo de combustível
- `marca`: Marca do veículo
- `mesReferencia`: Mês de referência da tabela

### Municipio

Results: Lista de municípios retornada com sucesso.

SDK operations: `load`.

Key fields to recognise:

- `codigo_ibge`: Código IBGE do município
- `nome`: Nome do município

### Ufn

Results: Lista de UFs retornada com sucesso; UF encontrada com sucesso.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: ID da UF
- `nome`: Nome da UF
- `sigla`: Sigla da UF

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Bank | `list` | `GET /banks/v1` | See reference |
| Bank | `load` | `GET /banks/v1/{code}` | See reference |
| Cep | `load` | `GET /cep/v1/{cep}` | See reference |
| Cep | `load` | `GET /cep/v2/{cep}` | See reference |
| Cnpj | `load` | `GET /cnpj/v1/{cnpj}` | See reference |
| Ddd | `load` | `GET /ddd/v1/{ddd}` | See reference |
| Feriado | `load` | `GET /feriados/v1/{ano}` | See reference |
| FipeMarca | `load` | `GET /fipe/marcas/v1/{tipoVeiculo}` | See reference |
| FipePreco | `load` | `GET /fipe/preco/v1/{codigoFipe}` | See reference |
| Municipio | `load` | `GET /ibge/municipios/v1/{siglaUF}` | See reference |
| Ufn | `list` | `GET /ibge/uf/v1` | See reference |
| Ufn | `load` | `GET /ibge/uf/v1/{siglaUF}` | See reference |

## Connect to the API

- Production server: `https://brasilapi.com.br/api`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `brasil_list`: List records for an entity. Supported entities: `bank`, `ufn`.
- `brasil_load`: Load one record for an entity. Supported entities: `bank`, `cep`, `cnpj`, `ddd`, `feriado`, `fipe_marca`, `fipe_preco`, `municipio`, `ufn`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

