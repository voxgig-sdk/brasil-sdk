# Brasil SDK configuration

module BrasilConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Brasil",
        "slug" => "brasil",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://brasilapi.com.br/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "bank" => {},
          "cep" => {},
          "cnpj" => {},
          "ddd" => {},
          "feriado" => {},
          "fipe_marca" => {},
          "fipe_preco" => {},
          "municipio" => {},
          "ufn" => {},
        },
      },
      "entity" => {
        "bank" => {
          "fields" => [
            {
              "name" => "code",
              "short" => "Código do banco",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "fullName",
              "short" => "Nome completo do banco",
              "type" => "`$STRING`",
            },
            {
              "name" => "ispb",
              "short" => "Identificador único do banco",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Nome do banco",
              "type" => "`$STRING`",
            },
          ],
          "name" => "bank",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/banks/v1",
                  "segments" => [
                    {
                      "lit" => "banks",
                    },
                    {
                      "lit" => "v1",
                    },
                  ],
                  "select" => {
                    "$action" => "v1",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "banks",
                    "v1",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "001",
                        "kind" => "param",
                        "name" => "code",
                        "orig" => "code",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/banks/v1/{code}",
                  "segments" => [
                    {
                      "lit" => "banks",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "code",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "code",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "banks",
                    "v1",
                    "{code}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "cep" => {
          "fields" => [
            {
              "name" => "coordinates",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "type" => "`$STRING`",
            },
          ],
          "name" => "cep",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "01310100",
                        "kind" => "param",
                        "name" => "cep",
                        "orig" => "cep",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cep/v1/{cep}",
                  "segments" => [
                    {
                      "lit" => "cep",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "cep",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cep",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.location`",
                  },
                  "parts" => [
                    "cep",
                    "v1",
                    "{cep}",
                  ],
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "01310100",
                        "kind" => "param",
                        "name" => "cep",
                        "orig" => "cep",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cep/v2/{cep}",
                  "segments" => [
                    {
                      "lit" => "cep",
                    },
                    {
                      "lit" => "v2",
                    },
                    {
                      "var" => "cep",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cep",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.location`",
                  },
                  "parts" => [
                    "cep",
                    "v2",
                    "{cep}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
              [
                "v2",
              ],
            ],
          },
        },
        "cnpj" => {
          "fields" => [
            {
              "name" => "bairro",
              "short" => "Bairro",
              "type" => "`$STRING`",
            },
            {
              "name" => "capital_social",
              "short" => "Capital social da empresa",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "cep",
              "short" => "CEP",
              "type" => "`$STRING`",
            },
            {
              "name" => "cnae_fiscal",
              "short" => "CNAE fiscal principal",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "cnae_fiscal_descricao",
              "short" => "Descrição do CNAE fiscal",
              "type" => "`$STRING`",
            },
            {
              "name" => "cnpj",
              "short" => "CNPJ consultado",
              "type" => "`$STRING`",
            },
            {
              "name" => "complemento",
              "short" => "Complemento do endereço",
              "type" => "`$STRING`",
            },
            {
              "format" => "date",
              "name" => "data_inicio_atividade",
              "short" => "Data de início das atividades",
              "type" => "`$STRING`",
            },
            {
              "name" => "ddd_telefone_1",
              "short" => "Telefone principal",
              "type" => "`$STRING`",
            },
            {
              "name" => "logradouro",
              "short" => "Logradouro do endereço",
              "type" => "`$STRING`",
            },
            {
              "name" => "municipio",
              "short" => "Município",
              "type" => "`$STRING`",
            },
            {
              "name" => "natureza_juridica",
              "short" => "Código da natureza jurídica",
              "type" => "`$STRING`",
            },
            {
              "name" => "nome_fantasia",
              "short" => "Nome fantasia da empresa",
              "type" => "`$STRING`",
            },
            {
              "name" => "numero",
              "short" => "Número do endereço",
              "type" => "`$STRING`",
            },
            {
              "name" => "porte",
              "short" => "Porte da empresa",
              "type" => "`$STRING`",
            },
            {
              "name" => "qsa",
              "short" => "Quadro de sócios e administradores",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "razao_social",
              "short" => "Razão social da empresa",
              "type" => "`$STRING`",
            },
            {
              "name" => "uf",
              "short" => "UF",
              "type" => "`$STRING`",
            },
          ],
          "name" => "cnpj",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "00000000000191",
                        "kind" => "param",
                        "name" => "cnpj",
                        "orig" => "cnpj",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/cnpj/v1/{cnpj}",
                  "segments" => [
                    {
                      "lit" => "cnpj",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "cnpj",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "cnpj",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "cnpj",
                    "v1",
                    "{cnpj}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "ddd" => {
          "fields" => [
            {
              "name" => "cities",
              "short" => "Lista de cidades com este DDD",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "state",
              "short" => "Sigla do estado",
              "type" => "`$STRING`",
            },
          ],
          "name" => "ddd",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "11",
                        "kind" => "param",
                        "name" => "ddd",
                        "orig" => "ddd",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ddd/v1/{ddd}",
                  "segments" => [
                    {
                      "lit" => "ddd",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "ddd",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ddd",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "ddd",
                    "v1",
                    "{ddd}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "feriado" => {
          "fields" => [
            {
              "format" => "date",
              "name" => "date",
              "short" => "Data do feriado",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Nome do feriado",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "Tipo de feriado",
              "type" => "`$STRING`",
            },
          ],
          "name" => "feriado",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 2024,
                        "kind" => "param",
                        "name" => "ano",
                        "orig" => "ano",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/feriados/v1/{ano}",
                  "segments" => [
                    {
                      "lit" => "feriados",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "ano",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "ano",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "feriados",
                    "v1",
                    "{ano}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "fipe_marca" => {
          "fields" => [
            {
              "name" => "nome",
              "short" => "Nome da marca",
              "type" => "`$STRING`",
            },
            {
              "name" => "valor",
              "short" => "Código da marca",
              "type" => "`$STRING`",
            },
          ],
          "name" => "fipe_marca",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "carros",
                        "kind" => "param",
                        "name" => "tipo_veiculo",
                        "orig" => "tipo_veiculo",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/fipe/marcas/v1/{tipoVeiculo}",
                  "rename" => {
                    "param" => {
                      "tipoVeiculo" => "tipo_veiculo",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "fipe",
                    },
                    {
                      "lit" => "marcas",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "tipo_veiculo",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "tipo_veiculo",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "fipe",
                    "marcas",
                    "v1",
                    "{tipo_veiculo}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "fipe_preco" => {
          "fields" => [
            {
              "name" => "anoModelo",
              "short" => "Ano do modelo",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "codigoFipe",
              "short" => "Código FIPE",
              "type" => "`$STRING`",
            },
            {
              "name" => "combustivel",
              "short" => "Tipo de combustível",
              "type" => "`$STRING`",
            },
            {
              "name" => "marca",
              "short" => "Marca do veículo",
              "type" => "`$STRING`",
            },
            {
              "name" => "mesReferencia",
              "short" => "Mês de referência da tabela",
              "type" => "`$STRING`",
            },
            {
              "name" => "modelo",
              "short" => "Modelo do veículo",
              "type" => "`$STRING`",
            },
            {
              "name" => "siglaCombustivel",
              "short" => "Sigla do combustível",
              "type" => "`$STRING`",
            },
            {
              "name" => "tipoVeiculo",
              "short" => "Tipo do veículo",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "valor",
              "short" => "Valor do veículo",
              "type" => "`$STRING`",
            },
          ],
          "name" => "fipe_preco",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "001004-1",
                        "kind" => "param",
                        "name" => "codigo_fipe",
                        "orig" => "codigo_fipe",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/fipe/preco/v1/{codigoFipe}",
                  "rename" => {
                    "param" => {
                      "codigoFipe" => "codigo_fipe",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "fipe",
                    },
                    {
                      "lit" => "preco",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "codigo_fipe",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "codigo_fipe",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "fipe",
                    "preco",
                    "v1",
                    "{codigo_fipe}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "municipio" => {
          "fields" => [
            {
              "name" => "codigo_ibge",
              "short" => "Código IBGE do município",
              "type" => "`$STRING`",
            },
            {
              "name" => "nome",
              "short" => "Nome do município",
              "type" => "`$STRING`",
            },
          ],
          "name" => "municipio",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "SP",
                        "kind" => "param",
                        "name" => "sigla_uf",
                        "orig" => "sigla_uf",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ibge/municipios/v1/{siglaUF}",
                  "rename" => {
                    "param" => {
                      "siglaUF" => "sigla_uf",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "ibge",
                    },
                    {
                      "lit" => "municipios",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "sigla_uf",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "sigla_uf",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "ibge",
                    "municipios",
                    "v1",
                    "{sigla_uf}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
        "ufn" => {
          "fields" => [
            {
              "name" => "id",
              "short" => "ID da UF",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nome",
              "short" => "Nome da UF",
              "type" => "`$STRING`",
            },
            {
              "name" => "regiao",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "sigla",
              "short" => "Sigla da UF",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "ufn",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ibge/uf/v1",
                  "segments" => [
                    {
                      "lit" => "ibge",
                    },
                    {
                      "lit" => "uf",
                    },
                    {
                      "lit" => "v1",
                    },
                  ],
                  "select" => {
                    "$action" => "v1",
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "ibge",
                    "uf",
                    "v1",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "SP",
                        "kind" => "param",
                        "name" => "sigla_uf",
                        "orig" => "sigla_uf",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ibge/uf/v1/{siglaUF}",
                  "rename" => {
                    "param" => {
                      "siglaUF" => "sigla_uf",
                    },
                  },
                  "segments" => [
                    {
                      "lit" => "ibge",
                    },
                    {
                      "lit" => "uf",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "var" => "sigla_uf",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "sigla_uf",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.regiao`",
                  },
                  "parts" => [
                    "ibge",
                    "uf",
                    "v1",
                    "{sigla_uf}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "v1",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BrasilFeatures.make_feature(name)
  end
end
