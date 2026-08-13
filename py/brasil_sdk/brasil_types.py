# Typed models for the Brasil SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Bank(TypedDict, total=False):
    code: int
    fullName: str
    ispb: str
    name: str


class BankLoadMatch(TypedDict):
    code: str


class BankListMatch(TypedDict, total=False):
    code: int
    fullName: str
    ispb: str
    name: str


class Cep(TypedDict, total=False):
    coordinates: dict
    type: str


class CepLoadMatch(TypedDict):
    cep: str


class Cnpj(TypedDict, total=False):
    bairro: str
    capital_social: float
    cep: str
    cnae_fiscal: int
    cnae_fiscal_descricao: str
    cnpj: str
    complemento: str
    data_inicio_atividade: str
    ddd_telefone_1: str
    logradouro: str
    municipio: str
    natureza_juridica: str
    nome_fantasia: str
    numero: str
    porte: str
    qsa: list
    razao_social: str
    uf: str


class CnpjLoadMatch(TypedDict):
    cnpj: str


class Ddd(TypedDict, total=False):
    cities: list
    state: str


class DddLoadMatch(TypedDict):
    ddd: str


class Feriado(TypedDict, total=False):
    date: str
    name: str
    type: str


class FeriadoLoadMatch(TypedDict):
    ano: int


class FipeMarca(TypedDict, total=False):
    nome: str
    valor: str


class FipeMarcaLoadMatch(TypedDict):
    tipo_veiculo: str


class FipePreco(TypedDict, total=False):
    anoModelo: int
    codigoFipe: str
    combustivel: str
    marca: str
    mesReferencia: str
    modelo: str
    siglaCombustivel: str
    tipoVeiculo: int
    valor: str


class FipePrecoLoadMatch(TypedDict):
    codigo_fipe: str


class Municipio(TypedDict, total=False):
    codigo_ibge: str
    nome: str


class MunicipioLoadMatch(TypedDict):
    sigla_uf: str


class Ufn(TypedDict, total=False):
    id: int
    nome: str
    regiao: dict
    sigla: str


class UfnLoadMatch(TypedDict):
    sigla_uf: str


class UfnListMatch(TypedDict, total=False):
    id: int
    nome: str
    regiao: dict
    sigla: str
