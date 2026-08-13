<?php
declare(strict_types=1);

// Typed models for the Brasil SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Bank entity data model. */
class Bank
{
    public ?int $code = null;
    public ?string $fullName = null;
    public ?string $ispb = null;
    public ?string $name = null;
}

/** Request payload for Bank#load. */
class BankLoadMatch
{
    public string $code;
}

/** Request payload for Bank#list. */
class BankListMatch
{
    public ?int $code = null;
    public ?string $fullName = null;
    public ?string $ispb = null;
    public ?string $name = null;
}

/** Cep entity data model. */
class Cep
{
    public ?array $coordinates = null;
    public ?string $type = null;
}

/** Request payload for Cep#load. */
class CepLoadMatch
{
    public string $cep;
}

/** Cnpj entity data model. */
class Cnpj
{
    public ?string $bairro = null;
    public ?float $capital_social = null;
    public ?string $cep = null;
    public ?int $cnae_fiscal = null;
    public ?string $cnae_fiscal_descricao = null;
    public ?string $cnpj = null;
    public ?string $complemento = null;
    public ?string $data_inicio_atividade = null;
    public ?string $ddd_telefone_1 = null;
    public ?string $logradouro = null;
    public ?string $municipio = null;
    public ?string $natureza_juridica = null;
    public ?string $nome_fantasia = null;
    public ?string $numero = null;
    public ?string $porte = null;
    public ?array $qsa = null;
    public ?string $razao_social = null;
    public ?string $uf = null;
}

/** Request payload for Cnpj#load. */
class CnpjLoadMatch
{
    public string $cnpj;
}

/** Ddd entity data model. */
class Ddd
{
    public ?array $cities = null;
    public ?string $state = null;
}

/** Request payload for Ddd#load. */
class DddLoadMatch
{
    public string $ddd;
}

/** Feriado entity data model. */
class Feriado
{
    public ?string $date = null;
    public ?string $name = null;
    public ?string $type = null;
}

/** Request payload for Feriado#load. */
class FeriadoLoadMatch
{
    public int $ano;
}

/** FipeMarca entity data model. */
class FipeMarca
{
    public ?string $nome = null;
    public ?string $valor = null;
}

/** Request payload for FipeMarca#load. */
class FipeMarcaLoadMatch
{
    public string $tipo_veiculo;
}

/** FipePreco entity data model. */
class FipePreco
{
    public ?int $anoModelo = null;
    public ?string $codigoFipe = null;
    public ?string $combustivel = null;
    public ?string $marca = null;
    public ?string $mesReferencia = null;
    public ?string $modelo = null;
    public ?string $siglaCombustivel = null;
    public ?int $tipoVeiculo = null;
    public ?string $valor = null;
}

/** Request payload for FipePreco#load. */
class FipePrecoLoadMatch
{
    public string $codigo_fipe;
}

/** Municipio entity data model. */
class Municipio
{
    public ?string $codigo_ibge = null;
    public ?string $nome = null;
}

/** Request payload for Municipio#load. */
class MunicipioLoadMatch
{
    public string $sigla_uf;
}

/** Ufn entity data model. */
class Ufn
{
    public ?int $id = null;
    public ?string $nome = null;
    public ?array $regiao = null;
    public ?string $sigla = null;
}

/** Request payload for Ufn#load. */
class UfnLoadMatch
{
    public string $sigla_uf;
}

/** Request payload for Ufn#list. */
class UfnListMatch
{
    public ?int $id = null;
    public ?string $nome = null;
    public ?array $regiao = null;
    public ?string $sigla = null;
}

