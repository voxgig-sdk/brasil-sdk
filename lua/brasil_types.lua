-- Typed models for the Brasil SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bank
---@field code? number
---@field fullName? string
---@field ispb? string
---@field name? string

---@class BankLoadMatch
---@field code string

---@class BankListMatch
---@field code? number
---@field fullName? string
---@field ispb? string
---@field name? string

---@class Cep
---@field coordinates? table
---@field type? string

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
---@field cities? table
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
---@field anoModelo? number
---@field codigoFipe? string
---@field combustivel? string
---@field marca? string
---@field mesReferencia? string
---@field modelo? string
---@field siglaCombustivel? string
---@field tipoVeiculo? number
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

---@class UfnLoadMatch
---@field sigla_uf string

---@class UfnListMatch
---@field id? number
---@field nome? string
---@field regiao? table
---@field sigla? string

local M = {}

return M
