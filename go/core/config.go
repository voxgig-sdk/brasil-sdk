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
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "fullName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ispb",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "capital_social",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "cep",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cnae_fiscal",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "cnae_fiscal_descricao",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cnpj",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "complemento",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "data_inicio_atividade",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ddd_telefone_1",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logradouro",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "municipio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "natureza_juridica",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nome_fantasia",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "numero",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "porte",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "qsa",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "razao_social",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uf",
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
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "state",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valor",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "codigoFipe",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "combustivel",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "marca",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mesReferencia",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modelo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "siglaCombustivel",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tipoVeiculo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "valor",
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
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nome",
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
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nome",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "regiao",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "sigla",
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
