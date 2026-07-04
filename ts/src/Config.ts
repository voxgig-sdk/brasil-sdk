
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
          "active": true,
          "name": "code",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "full_name",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "ispb",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "bank",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              "index$": 0
            }
          ],
          "key$": "list"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "001",
                    "kind": "param",
                    "name": "code",
                    "orig": "code",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "cep",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "city",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "location",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "neighborhood",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "service",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "street",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        }
      ],
      "name": "cep",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "01310100",
                    "kind": "param",
                    "name": "cep",
                    "orig": "cep",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
                "res": "`body.cep`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "01310100",
                    "kind": "param",
                    "name": "cep",
                    "orig": "cep",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
                "res": "`body.cep`"
              },
              "index$": 1
            }
          ],
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
          "active": true,
          "name": "bairro",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "capital_social",
          "req": false,
          "type": "`$NUMBER`",
          "index$": 1
        },
        {
          "active": true,
          "name": "cep",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "cnae_fiscal",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 3
        },
        {
          "active": true,
          "name": "cnae_fiscal_descricao",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "cnpj",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "complemento",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "data_inicio_atividade",
          "req": false,
          "type": "`$STRING`",
          "index$": 7
        },
        {
          "active": true,
          "name": "ddd_telefone_1",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        },
        {
          "active": true,
          "name": "logradouro",
          "req": false,
          "type": "`$STRING`",
          "index$": 9
        },
        {
          "active": true,
          "name": "municipio",
          "req": false,
          "type": "`$STRING`",
          "index$": 10
        },
        {
          "active": true,
          "name": "natureza_juridica",
          "req": false,
          "type": "`$STRING`",
          "index$": 11
        },
        {
          "active": true,
          "name": "nome_fantasia",
          "req": false,
          "type": "`$STRING`",
          "index$": 12
        },
        {
          "active": true,
          "name": "numero",
          "req": false,
          "type": "`$STRING`",
          "index$": 13
        },
        {
          "active": true,
          "name": "porte",
          "req": false,
          "type": "`$STRING`",
          "index$": 14
        },
        {
          "active": true,
          "name": "qsa",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 15
        },
        {
          "active": true,
          "name": "razao_social",
          "req": false,
          "type": "`$STRING`",
          "index$": 16
        },
        {
          "active": true,
          "name": "uf",
          "req": false,
          "type": "`$STRING`",
          "index$": 17
        }
      ],
      "name": "cnpj",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "00000000000191",
                    "kind": "param",
                    "name": "cnpj",
                    "orig": "cnpj",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
                "res": "`body.cnpj`"
              },
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "city",
          "req": false,
          "type": "`$ARRAY`",
          "index$": 0
        },
        {
          "active": true,
          "name": "state",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "ddd",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "11",
                    "kind": "param",
                    "name": "ddd",
                    "orig": "ddd",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "date",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "name",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "type",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        }
      ],
      "name": "feriado",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": 2024,
                    "kind": "param",
                    "name": "ano",
                    "orig": "ano",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "valor",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "fipe_marca",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "carros",
                    "kind": "param",
                    "name": "tipo_veiculo",
                    "orig": "tipo_veiculo",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "ano_modelo",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "codigo_fipe",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "combustivel",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "marca",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        },
        {
          "active": true,
          "name": "mes_referencia",
          "req": false,
          "type": "`$STRING`",
          "index$": 4
        },
        {
          "active": true,
          "name": "modelo",
          "req": false,
          "type": "`$STRING`",
          "index$": 5
        },
        {
          "active": true,
          "name": "sigla_combustivel",
          "req": false,
          "type": "`$STRING`",
          "index$": 6
        },
        {
          "active": true,
          "name": "tipo_veiculo",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 7
        },
        {
          "active": true,
          "name": "valor",
          "req": false,
          "type": "`$STRING`",
          "index$": 8
        }
      ],
      "name": "fipe_preco",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "001004-1",
                    "kind": "param",
                    "name": "codigo_fipe",
                    "orig": "codigo_fipe",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "codigo_ibge",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        }
      ],
      "name": "municipio",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "SP",
                    "kind": "param",
                    "name": "sigla_uf",
                    "orig": "sigla_uf",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "regiao",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "sigla",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "ufn",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "active": true,
              "args": {},
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
              "index$": 0
            }
          ],
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
          "active": true,
          "name": "id",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 0
        },
        {
          "active": true,
          "name": "nome",
          "req": false,
          "type": "`$STRING`",
          "index$": 1
        },
        {
          "active": true,
          "name": "regiao",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 2
        },
        {
          "active": true,
          "name": "sigla",
          "req": false,
          "type": "`$STRING`",
          "index$": 3
        }
      ],
      "name": "ufn2",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "SP",
                    "kind": "param",
                    "name": "sigla_uf",
                    "orig": "sigla_uf",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
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
              "index$": 0
            }
          ],
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

