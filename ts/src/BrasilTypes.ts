// Typed models for the Brasil SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bank {
  code?: number
  fullName?: string
  ispb?: string
  name?: string
}

export interface BankLoadMatch {
  code: string
}

export interface BankListMatch {
  code?: number
  fullName?: string
  ispb?: string
  name?: string

  // Selects a custom action instead of the plain list:
  //   'v1'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Cep {
  coordinates?: Record<string, any>
  type?: string
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
  cities?: any[]
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
  anoModelo?: number
  codigoFipe?: string
  combustivel?: string
  marca?: string
  mesReferencia?: string
  modelo?: string
  siglaCombustivel?: string
  tipoVeiculo?: number
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

export interface UfnLoadMatch {
  sigla_uf: string
}

export interface UfnListMatch {
  id?: number
  nome?: string
  regiao?: Record<string, any>
  sigla?: string

  // Selects a custom action instead of the plain list:
  //   'v1'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

