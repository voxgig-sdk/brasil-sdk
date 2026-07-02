package core

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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
				"ufn2": map[string]any{},
			},
		},
		"entity": map[string]any{
			"bank": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "code",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "full_name",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "ispb",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "bank",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "001",
											"kind": "param",
											"name": "code",
											"orig": "code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "cep",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "city",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "location",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "neighborhood",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "service",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "street",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
				},
				"name": "cep",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "01310100",
											"kind": "param",
											"name": "cep",
											"orig": "cep",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body.cep`",
								},
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "01310100",
											"kind": "param",
											"name": "cep",
											"orig": "cep",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body.cep`",
								},
								"index$": 1,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "bairro",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "capital_social",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "cep",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "cnae_fiscal",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "cnae_fiscal_descricao",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "cnpj",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "complemento",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "data_inicio_atividade",
						"req": false,
						"type": "`$STRING`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "ddd_telefone_1",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
					map[string]any{
						"active": true,
						"name": "logradouro",
						"req": false,
						"type": "`$STRING`",
						"index$": 9,
					},
					map[string]any{
						"active": true,
						"name": "municipio",
						"req": false,
						"type": "`$STRING`",
						"index$": 10,
					},
					map[string]any{
						"active": true,
						"name": "natureza_juridica",
						"req": false,
						"type": "`$STRING`",
						"index$": 11,
					},
					map[string]any{
						"active": true,
						"name": "nome_fantasia",
						"req": false,
						"type": "`$STRING`",
						"index$": 12,
					},
					map[string]any{
						"active": true,
						"name": "numero",
						"req": false,
						"type": "`$STRING`",
						"index$": 13,
					},
					map[string]any{
						"active": true,
						"name": "porte",
						"req": false,
						"type": "`$STRING`",
						"index$": 14,
					},
					map[string]any{
						"active": true,
						"name": "qsa",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 15,
					},
					map[string]any{
						"active": true,
						"name": "razao_social",
						"req": false,
						"type": "`$STRING`",
						"index$": 16,
					},
					map[string]any{
						"active": true,
						"name": "uf",
						"req": false,
						"type": "`$STRING`",
						"index$": 17,
					},
				},
				"name": "cnpj",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "00000000000191",
											"kind": "param",
											"name": "cnpj",
											"orig": "cnpj",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body.cnpj`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "city",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "state",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "ddd",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "11",
											"kind": "param",
											"name": "ddd",
											"orig": "ddd",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "date",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "name",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "type",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
				},
				"name": "feriado",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": 2024,
											"kind": "param",
											"name": "ano",
											"orig": "ano",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "nome",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "valor",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "fipe_marca",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "carros",
											"kind": "param",
											"name": "tipo_veiculo",
											"orig": "tipo_veiculo",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "ano_modelo",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "codigo_fipe",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "combustivel",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "marca",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "mes_referencia",
						"req": false,
						"type": "`$STRING`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "modelo",
						"req": false,
						"type": "`$STRING`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "sigla_combustivel",
						"req": false,
						"type": "`$STRING`",
						"index$": 6,
					},
					map[string]any{
						"active": true,
						"name": "tipo_veiculo",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 7,
					},
					map[string]any{
						"active": true,
						"name": "valor",
						"req": false,
						"type": "`$STRING`",
						"index$": 8,
					},
				},
				"name": "fipe_preco",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "001004-1",
											"kind": "param",
											"name": "codigo_fipe",
											"orig": "codigo_fipe",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "codigo_ibge",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "nome",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
				},
				"name": "municipio",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "SP",
											"kind": "param",
											"name": "sigla_uf",
											"orig": "sigla_uf",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
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
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "nome",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "regiao",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "sigla",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "ufn",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ufn2": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "id",
						"req": false,
						"type": "`$INTEGER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "nome",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "regiao",
						"req": false,
						"type": "`$OBJECT`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "sigla",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "ufn2",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": "SP",
											"kind": "param",
											"name": "sigla_uf",
											"orig": "sigla_uf",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
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
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
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
