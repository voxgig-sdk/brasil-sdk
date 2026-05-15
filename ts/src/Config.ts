
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://brasilapi.com.br/api',

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      bank: {
      },

      cep: {
      },

      cnpj: {
      },

      ddd: {
      },

      feriado: {
      },

      fipe_marca: {
      },

      fipe_preco: {
      },

      municipio: {
      },

      ufn: {
      },

      ufn2: {
      },

    }
  }


  entity = {
    "bank": {
      "fields": [
        {
          "name": "code",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "full_name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "ispb",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "bank",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/banks/v1",
              "parts": [
                "banks",
                "v1"
              ],
              "select": {
                "$action": "v1"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "001",
                    "kind": "param",
                    "name": "code",
                    "orig": "code",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/banks/v1/{code}",
              "parts": [
                "banks",
                "v1",
                "{code}"
              ],
              "select": {
                "exist": [
                  "code"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "cep": {
      "fields": [
        {
          "name": "cep",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "city",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "location",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "neighborhood",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "service",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "street",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        }
      ],
      "name": "cep",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "01310100",
                    "kind": "param",
                    "name": "cep",
                    "orig": "cep",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/cep/v1/{cep}",
              "parts": [
                "cep",
                "v1",
                "{cep}"
              ],
              "select": {
                "exist": [
                  "cep"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "example": "01310100",
                    "kind": "param",
                    "name": "cep",
                    "orig": "cep",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/cep/v2/{cep}",
              "parts": [
                "cep",
                "v2",
                "{cep}"
              ],
              "select": {
                "exist": [
                  "cep"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ],
          [
            "v2"
          ]
        ]
      }
    },
    "cnpj": {
      "fields": [
        {
          "name": "bairro",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "capital_social",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "cep",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "cnae_fiscal",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "cnae_fiscal_descricao",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "cnpj",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "complemento",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "data_inicio_atividade",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "ddd_telefone_1",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "logradouro",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "municipio",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "natureza_juridica",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "nome_fantasia",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "numero",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "porte",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "qsa",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 15
        },
        {
          "name": "razao_social",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        },
        {
          "name": "uf",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 17
        }
      ],
      "name": "cnpj",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "00000000000191",
                    "kind": "param",
                    "name": "cnpj",
                    "orig": "cnpj",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/cnpj/v1/{cnpj}",
              "parts": [
                "cnpj",
                "v1",
                "{cnpj}"
              ],
              "select": {
                "exist": [
                  "cnpj"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "ddd": {
      "fields": [
        {
          "name": "city",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "ddd",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "11",
                    "kind": "param",
                    "name": "ddd",
                    "orig": "ddd",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/ddd/v1/{ddd}",
              "parts": [
                "ddd",
                "v1",
                "{ddd}"
              ],
              "select": {
                "exist": [
                  "ddd"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "feriado": {
      "fields": [
        {
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "feriado",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 2024,
                    "kind": "param",
                    "name": "ano",
                    "orig": "ano",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/feriados/v1/{ano}",
              "parts": [
                "feriados",
                "v1",
                "{ano}"
              ],
              "select": {
                "exist": [
                  "ano"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "fipe_marca": {
      "fields": [
        {
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "valor",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "fipe_marca",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "carros",
                    "kind": "param",
                    "name": "tipo_veiculo",
                    "orig": "tipo_veiculo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/fipe/marcas/v1/{tipoVeiculo}",
              "parts": [
                "fipe",
                "marcas",
                "v1",
                "{tipo_veiculo}"
              ],
              "rename": {
                "param": {
                  "tipoVeiculo": "tipo_veiculo"
                }
              },
              "select": {
                "exist": [
                  "tipo_veiculo"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "fipe_preco": {
      "fields": [
        {
          "name": "ano_modelo",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "codigo_fipe",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "combustivel",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "marca",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "mes_referencia",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "modelo",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "sigla_combustivel",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "tipo_veiculo",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "valor",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        }
      ],
      "name": "fipe_preco",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "001004-1",
                    "kind": "param",
                    "name": "codigo_fipe",
                    "orig": "codigo_fipe",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/fipe/preco/v1/{codigoFipe}",
              "parts": [
                "fipe",
                "preco",
                "v1",
                "{codigo_fipe}"
              ],
              "rename": {
                "param": {
                  "codigoFipe": "codigo_fipe"
                }
              },
              "select": {
                "exist": [
                  "codigo_fipe"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "municipio": {
      "fields": [
        {
          "name": "codigo_ibge",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        }
      ],
      "name": "municipio",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "SP",
                    "kind": "param",
                    "name": "sigla_uf",
                    "orig": "sigla_uf",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/ibge/municipios/v1/{siglaUF}",
              "parts": [
                "ibge",
                "municipios",
                "v1",
                "{sigla_uf}"
              ],
              "rename": {
                "param": {
                  "siglaUF": "sigla_uf"
                }
              },
              "select": {
                "exist": [
                  "sigla_uf"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    },
    "ufn": {
      "fields": [
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "regiao",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "sigla",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "ufn",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/ibge/uf/v1",
              "parts": [
                "ibge",
                "uf",
                "v1"
              ],
              "select": {
                "$action": "v1"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ufn2": {
      "fields": [
        {
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "regiao",
          "req": false,
          "type": "`$OBJECT`",
          "active": true,
          "index$": 2
        },
        {
          "name": "sigla",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "ufn2",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "SP",
                    "kind": "param",
                    "name": "sigla_uf",
                    "orig": "sigla_uf",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/ibge/uf/v1/{siglaUF}",
              "parts": [
                "ibge",
                "uf",
                "v1",
                "{sigla_uf}"
              ],
              "rename": {
                "param": {
                  "siglaUF": "sigla_uf"
                }
              },
              "select": {
                "exist": [
                  "sigla_uf"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "v1"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

