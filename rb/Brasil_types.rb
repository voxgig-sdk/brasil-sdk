# frozen_string_literal: true

# Typed models for the Brasil SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Bank entity data model.
#
# @!attribute [rw] code
#   @return [Integer, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] ispb
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Bank = Struct.new(
  :code,
  :full_name,
  :ispb,
  :name,
  keyword_init: true
)

# Request payload for Bank#load.
#
# @!attribute [rw] code
#   @return [String]
BankLoadMatch = Struct.new(
  :code,
  keyword_init: true
)

# Match filter for Bank#list (any subset of Bank fields).
#
# @!attribute [rw] code
#   @return [Integer, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] ispb
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
BankListMatch = Struct.new(
  :code,
  :full_name,
  :ispb,
  :name,
  keyword_init: true
)

# Cep entity data model.
#
# @!attribute [rw] cep
#   @return [String, nil]
#
# @!attribute [rw] city
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] neighborhood
#   @return [String, nil]
#
# @!attribute [rw] service
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] street
#   @return [String, nil]
Cep = Struct.new(
  :cep,
  :city,
  :location,
  :neighborhood,
  :service,
  :state,
  :street,
  keyword_init: true
)

# Request payload for Cep#load.
#
# @!attribute [rw] cep
#   @return [String]
CepLoadMatch = Struct.new(
  :cep,
  keyword_init: true
)

# Cnpj entity data model.
#
# @!attribute [rw] bairro
#   @return [String, nil]
#
# @!attribute [rw] capital_social
#   @return [Float, nil]
#
# @!attribute [rw] cep
#   @return [String, nil]
#
# @!attribute [rw] cnae_fiscal
#   @return [Integer, nil]
#
# @!attribute [rw] cnae_fiscal_descricao
#   @return [String, nil]
#
# @!attribute [rw] cnpj
#   @return [String, nil]
#
# @!attribute [rw] complemento
#   @return [String, nil]
#
# @!attribute [rw] data_inicio_atividade
#   @return [String, nil]
#
# @!attribute [rw] ddd_telefone_1
#   @return [String, nil]
#
# @!attribute [rw] logradouro
#   @return [String, nil]
#
# @!attribute [rw] municipio
#   @return [String, nil]
#
# @!attribute [rw] natureza_juridica
#   @return [String, nil]
#
# @!attribute [rw] nome_fantasia
#   @return [String, nil]
#
# @!attribute [rw] numero
#   @return [String, nil]
#
# @!attribute [rw] porte
#   @return [String, nil]
#
# @!attribute [rw] qsa
#   @return [Array, nil]
#
# @!attribute [rw] razao_social
#   @return [String, nil]
#
# @!attribute [rw] uf
#   @return [String, nil]
Cnpj = Struct.new(
  :bairro,
  :capital_social,
  :cep,
  :cnae_fiscal,
  :cnae_fiscal_descricao,
  :cnpj,
  :complemento,
  :data_inicio_atividade,
  :ddd_telefone_1,
  :logradouro,
  :municipio,
  :natureza_juridica,
  :nome_fantasia,
  :numero,
  :porte,
  :qsa,
  :razao_social,
  :uf,
  keyword_init: true
)

# Request payload for Cnpj#load.
#
# @!attribute [rw] cnpj
#   @return [String]
CnpjLoadMatch = Struct.new(
  :cnpj,
  keyword_init: true
)

# Ddd entity data model.
#
# @!attribute [rw] city
#   @return [Array, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
Ddd = Struct.new(
  :city,
  :state,
  keyword_init: true
)

# Request payload for Ddd#load.
#
# @!attribute [rw] ddd
#   @return [String]
DddLoadMatch = Struct.new(
  :ddd,
  keyword_init: true
)

# Feriado entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Feriado = Struct.new(
  :date,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Feriado#load.
#
# @!attribute [rw] ano
#   @return [Integer]
FeriadoLoadMatch = Struct.new(
  :ano,
  keyword_init: true
)

# FipeMarca entity data model.
#
# @!attribute [rw] nome
#   @return [String, nil]
#
# @!attribute [rw] valor
#   @return [String, nil]
FipeMarca = Struct.new(
  :nome,
  :valor,
  keyword_init: true
)

# Request payload for FipeMarca#load.
#
# @!attribute [rw] tipo_veiculo
#   @return [String]
FipeMarcaLoadMatch = Struct.new(
  :tipo_veiculo,
  keyword_init: true
)

# FipePreco entity data model.
#
# @!attribute [rw] ano_modelo
#   @return [Integer, nil]
#
# @!attribute [rw] codigo_fipe
#   @return [String, nil]
#
# @!attribute [rw] combustivel
#   @return [String, nil]
#
# @!attribute [rw] marca
#   @return [String, nil]
#
# @!attribute [rw] mes_referencia
#   @return [String, nil]
#
# @!attribute [rw] modelo
#   @return [String, nil]
#
# @!attribute [rw] sigla_combustivel
#   @return [String, nil]
#
# @!attribute [rw] tipo_veiculo
#   @return [Integer, nil]
#
# @!attribute [rw] valor
#   @return [String, nil]
FipePreco = Struct.new(
  :ano_modelo,
  :codigo_fipe,
  :combustivel,
  :marca,
  :mes_referencia,
  :modelo,
  :sigla_combustivel,
  :tipo_veiculo,
  :valor,
  keyword_init: true
)

# Request payload for FipePreco#load.
#
# @!attribute [rw] codigo_fipe
#   @return [String]
FipePrecoLoadMatch = Struct.new(
  :codigo_fipe,
  keyword_init: true
)

# Municipio entity data model.
#
# @!attribute [rw] codigo_ibge
#   @return [String, nil]
#
# @!attribute [rw] nome
#   @return [String, nil]
Municipio = Struct.new(
  :codigo_ibge,
  :nome,
  keyword_init: true
)

# Request payload for Municipio#load.
#
# @!attribute [rw] sigla_uf
#   @return [String]
MunicipioLoadMatch = Struct.new(
  :sigla_uf,
  keyword_init: true
)

# Ufn entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] nome
#   @return [String, nil]
#
# @!attribute [rw] regiao
#   @return [Hash, nil]
#
# @!attribute [rw] sigla
#   @return [String, nil]
Ufn = Struct.new(
  :id,
  :nome,
  :regiao,
  :sigla,
  keyword_init: true
)

# Match filter for Ufn#list (any subset of Ufn fields).
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] nome
#   @return [String, nil]
#
# @!attribute [rw] regiao
#   @return [Hash, nil]
#
# @!attribute [rw] sigla
#   @return [String, nil]
UfnListMatch = Struct.new(
  :id,
  :nome,
  :regiao,
  :sigla,
  keyword_init: true
)

# Ufn2 entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] nome
#   @return [String, nil]
#
# @!attribute [rw] regiao
#   @return [Hash, nil]
#
# @!attribute [rw] sigla
#   @return [String, nil]
Ufn2 = Struct.new(
  :id,
  :nome,
  :regiao,
  :sigla,
  keyword_init: true
)

# Request payload for Ufn2#load.
#
# @!attribute [rw] sigla_uf
#   @return [String]
Ufn2LoadMatch = Struct.new(
  :sigla_uf,
  keyword_init: true
)

