// Typed models for the Brasil SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Bank is the typed data model for the bank entity.
type Bank struct {
	Code *int `json:"code,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Ispb *string `json:"ispb,omitempty"`
	Name *string `json:"name,omitempty"`
}

// BankLoadMatch is the typed request payload for Bank.LoadTyped.
type BankLoadMatch struct {
	Code string `json:"code"`
}

// BankListMatch mirrors the bank fields as an all-optional match
// filter (Go analog of Partial<Bank>).
type BankListMatch struct {
	Code *int `json:"code,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	Ispb *string `json:"ispb,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Cep is the typed data model for the cep entity.
type Cep struct {
	Cep *string `json:"cep,omitempty"`
	City *string `json:"city,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Neighborhood *string `json:"neighborhood,omitempty"`
	Service *string `json:"service,omitempty"`
	State *string `json:"state,omitempty"`
	Street *string `json:"street,omitempty"`
}

// CepLoadMatch is the typed request payload for Cep.LoadTyped.
type CepLoadMatch struct {
	Cep string `json:"cep"`
}

// Cnpj is the typed data model for the cnpj entity.
type Cnpj struct {
	Bairro *string `json:"bairro,omitempty"`
	CapitalSocial *float64 `json:"capital_social,omitempty"`
	Cep *string `json:"cep,omitempty"`
	CnaeFiscal *int `json:"cnae_fiscal,omitempty"`
	CnaeFiscalDescricao *string `json:"cnae_fiscal_descricao,omitempty"`
	Cnpj *string `json:"cnpj,omitempty"`
	Complemento *string `json:"complemento,omitempty"`
	DataInicioAtividade *string `json:"data_inicio_atividade,omitempty"`
	DddTelefone1 *string `json:"ddd_telefone_1,omitempty"`
	Logradouro *string `json:"logradouro,omitempty"`
	Municipio *string `json:"municipio,omitempty"`
	NaturezaJuridica *string `json:"natureza_juridica,omitempty"`
	NomeFantasia *string `json:"nome_fantasia,omitempty"`
	Numero *string `json:"numero,omitempty"`
	Porte *string `json:"porte,omitempty"`
	Qsa *[]any `json:"qsa,omitempty"`
	RazaoSocial *string `json:"razao_social,omitempty"`
	Uf *string `json:"uf,omitempty"`
}

// CnpjLoadMatch is the typed request payload for Cnpj.LoadTyped.
type CnpjLoadMatch struct {
	Cnpj string `json:"cnpj"`
}

// Ddd is the typed data model for the ddd entity.
type Ddd struct {
	City *[]any `json:"city,omitempty"`
	State *string `json:"state,omitempty"`
}

// DddLoadMatch is the typed request payload for Ddd.LoadTyped.
type DddLoadMatch struct {
	Ddd string `json:"ddd"`
}

// Feriado is the typed data model for the feriado entity.
type Feriado struct {
	Date *string `json:"date,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// FeriadoLoadMatch is the typed request payload for Feriado.LoadTyped.
type FeriadoLoadMatch struct {
	Ano int `json:"ano"`
}

// FipeMarca is the typed data model for the fipe_marca entity.
type FipeMarca struct {
	Nome *string `json:"nome,omitempty"`
	Valor *string `json:"valor,omitempty"`
}

// FipeMarcaLoadMatch is the typed request payload for FipeMarca.LoadTyped.
type FipeMarcaLoadMatch struct {
	TipoVeiculo string `json:"tipo_veiculo"`
}

// FipePreco is the typed data model for the fipe_preco entity.
type FipePreco struct {
	AnoModelo *int `json:"ano_modelo,omitempty"`
	CodigoFipe *string `json:"codigo_fipe,omitempty"`
	Combustivel *string `json:"combustivel,omitempty"`
	Marca *string `json:"marca,omitempty"`
	MesReferencia *string `json:"mes_referencia,omitempty"`
	Modelo *string `json:"modelo,omitempty"`
	SiglaCombustivel *string `json:"sigla_combustivel,omitempty"`
	TipoVeiculo *int `json:"tipo_veiculo,omitempty"`
	Valor *string `json:"valor,omitempty"`
}

// FipePrecoLoadMatch is the typed request payload for FipePreco.LoadTyped.
type FipePrecoLoadMatch struct {
	CodigoFipe string `json:"codigo_fipe"`
}

// Municipio is the typed data model for the municipio entity.
type Municipio struct {
	CodigoIbge *string `json:"codigo_ibge,omitempty"`
	Nome *string `json:"nome,omitempty"`
}

// MunicipioLoadMatch is the typed request payload for Municipio.LoadTyped.
type MunicipioLoadMatch struct {
	SiglaUf string `json:"sigla_uf"`
}

// Ufn is the typed data model for the ufn entity.
type Ufn struct {
	Id *int `json:"id,omitempty"`
	Nome *string `json:"nome,omitempty"`
	Regiao *map[string]any `json:"regiao,omitempty"`
	Sigla *string `json:"sigla,omitempty"`
}

// UfnListMatch mirrors the ufn fields as an all-optional match
// filter (Go analog of Partial<Ufn>).
type UfnListMatch struct {
	Id *int `json:"id,omitempty"`
	Nome *string `json:"nome,omitempty"`
	Regiao *map[string]any `json:"regiao,omitempty"`
	Sigla *string `json:"sigla,omitempty"`
}

// Ufn2 is the typed data model for the ufn2 entity.
type Ufn2 struct {
	Id *int `json:"id,omitempty"`
	Nome *string `json:"nome,omitempty"`
	Regiao *map[string]any `json:"regiao,omitempty"`
	Sigla *string `json:"sigla,omitempty"`
}

// Ufn2LoadMatch is the typed request payload for Ufn2.LoadTyped.
type Ufn2LoadMatch struct {
	SiglaUf string `json:"sigla_uf"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
