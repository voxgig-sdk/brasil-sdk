# Brasil SDK configuration


def make_config():
    return {
        "main": {
            "name": "Brasil",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://brasilapi.com.br/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bank": {},
                "cep": {},
                "cnpj": {},
                "ddd": {},
                "feriado": {},
                "fipe_marca": {},
                "fipe_preco": {},
                "municipio": {},
                "ufn": {},
                "ufn2": {},
            },
        },
        "entity": {
      "bank": {
        "fields": [
          {
            "active": True,
            "name": "code",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "full_name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "ispb",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "bank",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/banks/v1",
                "parts": [
                  "banks",
                  "v1",
                ],
                "select": {
                  "$action": "v1",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "001",
                      "kind": "param",
                      "name": "code",
                      "orig": "code",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/banks/v1/{code}",
                "parts": [
                  "banks",
                  "v1",
                  "{code}",
                ],
                "select": {
                  "exist": [
                    "code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "cep": {
        "fields": [
          {
            "active": True,
            "name": "cep",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "city",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "location",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "neighborhood",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "service",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "state",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "street",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
        ],
        "name": "cep",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "01310100",
                      "kind": "param",
                      "name": "cep",
                      "orig": "cep",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cep/v1/{cep}",
                "parts": [
                  "cep",
                  "v1",
                  "{cep}",
                ],
                "select": {
                  "exist": [
                    "cep",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cep`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "01310100",
                      "kind": "param",
                      "name": "cep",
                      "orig": "cep",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cep/v2/{cep}",
                "parts": [
                  "cep",
                  "v2",
                  "{cep}",
                ],
                "select": {
                  "exist": [
                    "cep",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cep`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
            [
              "v2",
            ],
          ],
        },
      },
      "cnpj": {
        "fields": [
          {
            "active": True,
            "name": "bairro",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "capital_social",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "cep",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "cnae_fiscal",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "cnae_fiscal_descricao",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "cnpj",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "complemento",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "data_inicio_atividade",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "ddd_telefone_1",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "logradouro",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "municipio",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "natureza_juridica",
            "req": False,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "nome_fantasia",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "numero",
            "req": False,
            "type": "`$STRING`",
            "index$": 13,
          },
          {
            "active": True,
            "name": "porte",
            "req": False,
            "type": "`$STRING`",
            "index$": 14,
          },
          {
            "active": True,
            "name": "qsa",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 15,
          },
          {
            "active": True,
            "name": "razao_social",
            "req": False,
            "type": "`$STRING`",
            "index$": 16,
          },
          {
            "active": True,
            "name": "uf",
            "req": False,
            "type": "`$STRING`",
            "index$": 17,
          },
        ],
        "name": "cnpj",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "00000000000191",
                      "kind": "param",
                      "name": "cnpj",
                      "orig": "cnpj",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cnpj/v1/{cnpj}",
                "parts": [
                  "cnpj",
                  "v1",
                  "{cnpj}",
                ],
                "select": {
                  "exist": [
                    "cnpj",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.cnpj`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "ddd": {
        "fields": [
          {
            "active": True,
            "name": "city",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "state",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "ddd",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "11",
                      "kind": "param",
                      "name": "ddd",
                      "orig": "ddd",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ddd/v1/{ddd}",
                "parts": [
                  "ddd",
                  "v1",
                  "{ddd}",
                ],
                "select": {
                  "exist": [
                    "ddd",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "feriado": {
        "fields": [
          {
            "active": True,
            "name": "date",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "type",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "feriado",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 2024,
                      "kind": "param",
                      "name": "ano",
                      "orig": "ano",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/feriados/v1/{ano}",
                "parts": [
                  "feriados",
                  "v1",
                  "{ano}",
                ],
                "select": {
                  "exist": [
                    "ano",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "fipe_marca": {
        "fields": [
          {
            "active": True,
            "name": "nome",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "valor",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "fipe_marca",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "carros",
                      "kind": "param",
                      "name": "tipo_veiculo",
                      "orig": "tipo_veiculo",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/fipe/marcas/v1/{tipoVeiculo}",
                "parts": [
                  "fipe",
                  "marcas",
                  "v1",
                  "{tipo_veiculo}",
                ],
                "rename": {
                  "param": {
                    "tipoVeiculo": "tipo_veiculo",
                  },
                },
                "select": {
                  "exist": [
                    "tipo_veiculo",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "fipe_preco": {
        "fields": [
          {
            "active": True,
            "name": "ano_modelo",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "codigo_fipe",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "combustivel",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "marca",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "mes_referencia",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "modelo",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "sigla_combustivel",
            "req": False,
            "type": "`$STRING`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "tipo_veiculo",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "valor",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
        ],
        "name": "fipe_preco",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "001004-1",
                      "kind": "param",
                      "name": "codigo_fipe",
                      "orig": "codigo_fipe",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/fipe/preco/v1/{codigoFipe}",
                "parts": [
                  "fipe",
                  "preco",
                  "v1",
                  "{codigo_fipe}",
                ],
                "rename": {
                  "param": {
                    "codigoFipe": "codigo_fipe",
                  },
                },
                "select": {
                  "exist": [
                    "codigo_fipe",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "municipio": {
        "fields": [
          {
            "active": True,
            "name": "codigo_ibge",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "nome",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
        ],
        "name": "municipio",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "SP",
                      "kind": "param",
                      "name": "sigla_uf",
                      "orig": "sigla_uf",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ibge/municipios/v1/{siglaUF}",
                "parts": [
                  "ibge",
                  "municipios",
                  "v1",
                  "{sigla_uf}",
                ],
                "rename": {
                  "param": {
                    "siglaUF": "sigla_uf",
                  },
                },
                "select": {
                  "exist": [
                    "sigla_uf",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
      "ufn": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "nome",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "regiao",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "sigla",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "ufn",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "GET",
                "orig": "/ibge/uf/v1",
                "parts": [
                  "ibge",
                  "uf",
                  "v1",
                ],
                "select": {
                  "$action": "v1",
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ufn2": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "nome",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "regiao",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "sigla",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "ufn2",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": "SP",
                      "kind": "param",
                      "name": "sigla_uf",
                      "orig": "sigla_uf",
                      "reqd": True,
                      "type": "`$STRING`",
                      "index$": 0,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ibge/uf/v1/{siglaUF}",
                "parts": [
                  "ibge",
                  "uf",
                  "v1",
                  "{sigla_uf}",
                ],
                "rename": {
                  "param": {
                    "siglaUF": "sigla_uf",
                  },
                },
                "select": {
                  "exist": [
                    "sigla_uf",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "v1",
            ],
          ],
        },
      },
    },
    }
