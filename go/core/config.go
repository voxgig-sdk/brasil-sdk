package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Brasil",
			"slug": "brasil",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://brasilapi.com.br/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"bank": map[string]any{},
				"cep": map[string]any{},
				"cnpj": map[string]any{},
				"ddd": map[string]any{},
				"feriado": map[string]any{},
				"fipe_marca": map[string]any{},
				"fipe_preco": map[string]any{},
				"municipio": map[string]any{},
				"ufn": map[string]any{},
			},
		},
		"entity": map[string]any{
			"bank": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"short": "Código do banco",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fullName",
						"short": "Nome completo do banco",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ispb",
						"short": "Identificador único do banco",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Nome do banco",
						"type": "`$STRING`",
					},
				},
				"name": "bank",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/banks/v1",
								"parts": []any{
									"banks",
									"v1",
								},
								"select": map[string]any{
									"$action": "v1",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "001",
											"kind": "param",
											"name": "code",
											"orig": "code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/banks/v1/{code}",
								"parts": []any{
									"banks",
									"v1",
									"{code}",
								},
								"select": map[string]any{
									"exist": []any{
										"code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"cep": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "coordinates",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"name": "cep",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "01310100",
											"kind": "param",
											"name": "cep",
											"orig": "cep",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cep/v1/{cep}",
								"parts": []any{
									"cep",
									"v1",
									"{cep}",
								},
								"select": map[string]any{
									"exist": []any{
										"cep",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.location`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "01310100",
											"kind": "param",
											"name": "cep",
											"orig": "cep",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cep/v2/{cep}",
								"parts": []any{
									"cep",
									"v2",
									"{cep}",
								},
								"select": map[string]any{
									"exist": []any{
										"cep",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.location`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
						[]any{
							"v2",
						},
					},
				},
			},
			"cnpj": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bairro",
						"short": "Bairro",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "capital_social",
						"short": "Capital social da empresa",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "cep",
						"short": "CEP",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cnae_fiscal",
						"short": "CNAE fiscal principal",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cnae_fiscal_descricao",
						"short": "Descrição do CNAE fiscal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cnpj",
						"short": "CNPJ consultado",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "complemento",
						"short": "Complemento do endereço",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data_inicio_atividade",
						"short": "Data de início das atividades",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ddd_telefone_1",
						"short": "Telefone principal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logradouro",
						"short": "Logradouro do endereço",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "municipio",
						"short": "Município",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "natureza_juridica",
						"short": "Código da natureza jurídica",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nome_fantasia",
						"short": "Nome fantasia da empresa",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "numero",
						"short": "Número do endereço",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "porte",
						"short": "Porte da empresa",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "qsa",
						"short": "Quadro de sócios e administradores",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "razao_social",
						"short": "Razão social da empresa",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uf",
						"short": "UF",
						"type": "`$STRING`",
					},
				},
				"name": "cnpj",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "00000000000191",
											"kind": "param",
											"name": "cnpj",
											"orig": "cnpj",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cnpj/v1/{cnpj}",
								"parts": []any{
									"cnpj",
									"v1",
									"{cnpj}",
								},
								"select": map[string]any{
									"exist": []any{
										"cnpj",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"ddd": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cities",
						"short": "Lista de cidades com este DDD",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "state",
						"short": "Sigla do estado",
						"type": "`$STRING`",
					},
				},
				"name": "ddd",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "11",
											"kind": "param",
											"name": "ddd",
											"orig": "ddd",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ddd/v1/{ddd}",
								"parts": []any{
									"ddd",
									"v1",
									"{ddd}",
								},
								"select": map[string]any{
									"exist": []any{
										"ddd",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"feriado": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"short": "Data do feriado",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Nome do feriado",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Tipo de feriado",
						"type": "`$STRING`",
					},
				},
				"name": "feriado",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 2024,
											"kind": "param",
											"name": "ano",
											"orig": "ano",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/feriados/v1/{ano}",
								"parts": []any{
									"feriados",
									"v1",
									"{ano}",
								},
								"select": map[string]any{
									"exist": []any{
										"ano",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"fipe_marca": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "nome",
						"short": "Nome da marca",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valor",
						"short": "Código da marca",
						"type": "`$STRING`",
					},
				},
				"name": "fipe_marca",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "carros",
											"kind": "param",
											"name": "tipo_veiculo",
											"orig": "tipo_veiculo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/fipe/marcas/v1/{tipoVeiculo}",
								"parts": []any{
									"fipe",
									"marcas",
									"v1",
									"{tipo_veiculo}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tipoVeiculo": "tipo_veiculo",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"tipo_veiculo",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"fipe_preco": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "anoModelo",
						"short": "Ano do modelo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "codigoFipe",
						"short": "Código FIPE",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "combustivel",
						"short": "Tipo de combustível",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "marca",
						"short": "Marca do veículo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mesReferencia",
						"short": "Mês de referência da tabela",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelo",
						"short": "Modelo do veículo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "siglaCombustivel",
						"short": "Sigla do combustível",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tipoVeiculo",
						"short": "Tipo do veículo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "valor",
						"short": "Valor do veículo",
						"type": "`$STRING`",
					},
				},
				"name": "fipe_preco",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "001004-1",
											"kind": "param",
											"name": "codigo_fipe",
											"orig": "codigo_fipe",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/fipe/preco/v1/{codigoFipe}",
								"parts": []any{
									"fipe",
									"preco",
									"v1",
									"{codigo_fipe}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"codigoFipe": "codigo_fipe",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"codigo_fipe",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"municipio": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "codigo_ibge",
						"short": "Código IBGE do município",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nome",
						"short": "Nome do município",
						"type": "`$STRING`",
					},
				},
				"name": "municipio",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "SP",
											"kind": "param",
											"name": "sigla_uf",
											"orig": "sigla_uf",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ibge/municipios/v1/{siglaUF}",
								"parts": []any{
									"ibge",
									"municipios",
									"v1",
									"{sigla_uf}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"siglaUF": "sigla_uf",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sigla_uf",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
			"ufn": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "ID da UF",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nome",
						"short": "Nome da UF",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regiao",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sigla",
						"short": "Sigla da UF",
						"type": "`$STRING`",
					},
				},
				"name": "ufn",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/ibge/uf/v1",
								"parts": []any{
									"ibge",
									"uf",
									"v1",
								},
								"select": map[string]any{
									"$action": "v1",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "SP",
											"kind": "param",
											"name": "sigla_uf",
											"orig": "sigla_uf",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ibge/uf/v1/{siglaUF}",
								"parts": []any{
									"ibge",
									"uf",
									"v1",
									"{sigla_uf}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"siglaUF": "sigla_uf",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"sigla_uf",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.regiao`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"v1",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
