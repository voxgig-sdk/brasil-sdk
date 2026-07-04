# Typed models for the Brasil SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Bank:
    code: Optional[int] = None
    full_name: Optional[str] = None
    ispb: Optional[str] = None
    name: Optional[str] = None


@dataclass
class BankLoadMatch:
    code: str


@dataclass
class BankListMatch:
    code: Optional[int] = None
    full_name: Optional[str] = None
    ispb: Optional[str] = None
    name: Optional[str] = None


@dataclass
class Cep:
    cep: Optional[str] = None
    city: Optional[str] = None
    location: Optional[dict] = None
    neighborhood: Optional[str] = None
    service: Optional[str] = None
    state: Optional[str] = None
    street: Optional[str] = None


@dataclass
class CepLoadMatch:
    cep: str


@dataclass
class Cnpj:
    bairro: Optional[str] = None
    capital_social: Optional[float] = None
    cep: Optional[str] = None
    cnae_fiscal: Optional[int] = None
    cnae_fiscal_descricao: Optional[str] = None
    cnpj: Optional[str] = None
    complemento: Optional[str] = None
    data_inicio_atividade: Optional[str] = None
    ddd_telefone_1: Optional[str] = None
    logradouro: Optional[str] = None
    municipio: Optional[str] = None
    natureza_juridica: Optional[str] = None
    nome_fantasia: Optional[str] = None
    numero: Optional[str] = None
    porte: Optional[str] = None
    qsa: Optional[list] = None
    razao_social: Optional[str] = None
    uf: Optional[str] = None


@dataclass
class CnpjLoadMatch:
    cnpj: str


@dataclass
class Ddd:
    city: Optional[list] = None
    state: Optional[str] = None


@dataclass
class DddLoadMatch:
    ddd: str


@dataclass
class Feriado:
    date: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class FeriadoLoadMatch:
    ano: int


@dataclass
class FipeMarca:
    nome: Optional[str] = None
    valor: Optional[str] = None


@dataclass
class FipeMarcaLoadMatch:
    tipo_veiculo: str


@dataclass
class FipePreco:
    ano_modelo: Optional[int] = None
    codigo_fipe: Optional[str] = None
    combustivel: Optional[str] = None
    marca: Optional[str] = None
    mes_referencia: Optional[str] = None
    modelo: Optional[str] = None
    sigla_combustivel: Optional[str] = None
    tipo_veiculo: Optional[int] = None
    valor: Optional[str] = None


@dataclass
class FipePrecoLoadMatch:
    codigo_fipe: str


@dataclass
class Municipio:
    codigo_ibge: Optional[str] = None
    nome: Optional[str] = None


@dataclass
class MunicipioLoadMatch:
    sigla_uf: str


@dataclass
class Ufn:
    id: Optional[int] = None
    nome: Optional[str] = None
    regiao: Optional[dict] = None
    sigla: Optional[str] = None


@dataclass
class UfnListMatch:
    id: Optional[int] = None
    nome: Optional[str] = None
    regiao: Optional[dict] = None
    sigla: Optional[str] = None


@dataclass
class Ufn2:
    id: Optional[int] = None
    nome: Optional[str] = None
    regiao: Optional[dict] = None
    sigla: Optional[str] = None


@dataclass
class Ufn2LoadMatch:
    sigla_uf: str

