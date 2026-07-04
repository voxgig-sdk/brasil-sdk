// Typed models for the Brasil SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bank {
  code?: number
  full_name?: string
  ispb?: string
  name?: string
}

export interface BankLoadMatch {
  code: string
}

export type BankListMatch = Partial<Bank>

export interface Cep {
  cep?: string
  city?: string
  location?: Record<string, any>
  neighborhood?: string
  service?: string
  state?: string
  street?: string
}

export interface CepLoadMatch {
  cep: string
}

export interface Cnpj {
  bairro?: string
  capital_social?: number
  cep?: string
  cnae_fiscal?: number
  cnae_fiscal_descricao?: string
  cnpj?: string
  complemento?: string
  data_inicio_atividade?: string
  ddd_telefone_1?: string
  logradouro?: string
  municipio?: string
  natureza_juridica?: string
  nome_fantasia?: string
  numero?: string
  porte?: string
  qsa?: any[]
  razao_social?: string
  uf?: string
}

export interface CnpjLoadMatch {
  cnpj: string
}

export interface Ddd {
  city?: any[]
  state?: string
}

export interface DddLoadMatch {
  ddd: string
}

export interface Feriado {
  date?: string
  name?: string
  type?: string
}

export interface FeriadoLoadMatch {
  ano: number
}

export interface FipeMarca {
  nome?: string
  valor?: string
}

export interface FipeMarcaLoadMatch {
  tipo_veiculo: string
}

export interface FipePreco {
  ano_modelo?: number
  codigo_fipe?: string
  combustivel?: string
  marca?: string
  mes_referencia?: string
  modelo?: string
  sigla_combustivel?: string
  tipo_veiculo?: number
  valor?: string
}

export interface FipePrecoLoadMatch {
  codigo_fipe: string
}

export interface Municipio {
  codigo_ibge?: string
  nome?: string
}

export interface MunicipioLoadMatch {
  sigla_uf: string
}

export interface Ufn {
  id?: number
  nome?: string
  regiao?: Record<string, any>
  sigla?: string
}

export type UfnListMatch = Partial<Ufn>

export interface Ufn2 {
  id?: number
  nome?: string
  regiao?: Record<string, any>
  sigla?: string
}

export interface Ufn2LoadMatch {
  sigla_uf: string
}

