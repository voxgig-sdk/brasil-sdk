-- Typed models for the Brasil SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bank
---@field code? number
---@field full_name? string
---@field ispb? string
---@field name? string

---@class BankLoadMatch
---@field code string

---@class BankListMatch

---@class Cep
---@field cep? string
---@field city? string
---@field location? table
---@field neighborhood? string
---@field service? string
---@field state? string
---@field street? string

---@class CepLoadMatch
---@field cep string

---@class Cnpj
---@field bairro? string
---@field capital_social? number
---@field cep? string
---@field cnae_fiscal? number
---@field cnae_fiscal_descricao? string
---@field cnpj? string
---@field complemento? string
---@field data_inicio_atividade? string
---@field ddd_telefone_1? string
---@field logradouro? string
---@field municipio? string
---@field natureza_juridica? string
---@field nome_fantasia? string
---@field numero? string
---@field porte? string
---@field qsa? table
---@field razao_social? string
---@field uf? string

---@class CnpjLoadMatch
---@field cnpj string

---@class Ddd
---@field city? table
---@field state? string

---@class DddLoadMatch
---@field ddd string

---@class Feriado
---@field date? string
---@field name? string
---@field type? string

---@class FeriadoLoadMatch
---@field ano number

---@class FipeMarca
---@field nome? string
---@field valor? string

---@class FipeMarcaLoadMatch
---@field tipo_veiculo string

---@class FipePreco
---@field ano_modelo? number
---@field codigo_fipe? string
---@field combustivel? string
---@field marca? string
---@field mes_referencia? string
---@field modelo? string
---@field sigla_combustivel? string
---@field tipo_veiculo? number
---@field valor? string

---@class FipePrecoLoadMatch
---@field codigo_fipe string

---@class Municipio
---@field codigo_ibge? string
---@field nome? string

---@class MunicipioLoadMatch
---@field sigla_uf string

---@class Ufn
---@field id? number
---@field nome? string
---@field regiao? table
---@field sigla? string

---@class UfnListMatch

---@class Ufn2
---@field id? number
---@field nome? string
---@field regiao? table
---@field sigla? string

---@class Ufn2LoadMatch
---@field sigla_uf string

local M = {}

return M
