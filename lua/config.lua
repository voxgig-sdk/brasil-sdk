-- Brasil SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Brasil",
      slug = "brasil",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://brasilapi.com.br/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["bank"] = {},
        ["cep"] = {},
        ["cnpj"] = {},
        ["ddd"] = {},
        ["feriado"] = {},
        ["fipe_marca"] = {},
        ["fipe_preco"] = {},
        ["municipio"] = {},
        ["ufn"] = {},
      },
    },
    entity = {
      ["bank"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["short"] = "Código do banco",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "fullName",
            ["short"] = "Nome completo do banco",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ispb",
            ["short"] = "Identificador único do banco",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Nome do banco",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "bank",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/banks/v1",
                ["parts"] = {
                  "banks",
                  "v1",
                },
                ["select"] = {
                  ["$action"] = "v1",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "001",
                      ["kind"] = "param",
                      ["name"] = "code",
                      ["orig"] = "code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/banks/v1/{code}",
                ["parts"] = {
                  "banks",
                  "v1",
                  "{code}",
                },
                ["select"] = {
                  ["exist"] = {
                    "code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["cep"] = {
        ["fields"] = {
          {
            ["name"] = "coordinates",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "type",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "cep",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "01310100",
                      ["kind"] = "param",
                      ["name"] = "cep",
                      ["orig"] = "cep",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cep/v1/{cep}",
                ["parts"] = {
                  "cep",
                  "v1",
                  "{cep}",
                },
                ["select"] = {
                  ["exist"] = {
                    "cep",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.location`",
                },
              },
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "01310100",
                      ["kind"] = "param",
                      ["name"] = "cep",
                      ["orig"] = "cep",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cep/v2/{cep}",
                ["parts"] = {
                  "cep",
                  "v2",
                  "{cep}",
                },
                ["select"] = {
                  ["exist"] = {
                    "cep",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.location`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
            {
              "v2",
            },
          },
        },
      },
      ["cnpj"] = {
        ["fields"] = {
          {
            ["name"] = "bairro",
            ["short"] = "Bairro",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "capital_social",
            ["short"] = "Capital social da empresa",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "cep",
            ["short"] = "CEP",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cnae_fiscal",
            ["short"] = "CNAE fiscal principal",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "cnae_fiscal_descricao",
            ["short"] = "Descrição do CNAE fiscal",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cnpj",
            ["short"] = "CNPJ consultado",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "complemento",
            ["short"] = "Complemento do endereço",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "data_inicio_atividade",
            ["short"] = "Data de início das atividades",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ddd_telefone_1",
            ["short"] = "Telefone principal",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "logradouro",
            ["short"] = "Logradouro do endereço",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "municipio",
            ["short"] = "Município",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "natureza_juridica",
            ["short"] = "Código da natureza jurídica",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nome_fantasia",
            ["short"] = "Nome fantasia da empresa",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "numero",
            ["short"] = "Número do endereço",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "porte",
            ["short"] = "Porte da empresa",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "qsa",
            ["short"] = "Quadro de sócios e administradores",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "razao_social",
            ["short"] = "Razão social da empresa",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "uf",
            ["short"] = "UF",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "cnpj",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "00000000000191",
                      ["kind"] = "param",
                      ["name"] = "cnpj",
                      ["orig"] = "cnpj",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cnpj/v1/{cnpj}",
                ["parts"] = {
                  "cnpj",
                  "v1",
                  "{cnpj}",
                },
                ["select"] = {
                  ["exist"] = {
                    "cnpj",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["ddd"] = {
        ["fields"] = {
          {
            ["name"] = "cities",
            ["short"] = "Lista de cidades com este DDD",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "state",
            ["short"] = "Sigla do estado",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "ddd",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "11",
                      ["kind"] = "param",
                      ["name"] = "ddd",
                      ["orig"] = "ddd",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ddd/v1/{ddd}",
                ["parts"] = {
                  "ddd",
                  "v1",
                  "{ddd}",
                },
                ["select"] = {
                  ["exist"] = {
                    "ddd",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["feriado"] = {
        ["fields"] = {
          {
            ["name"] = "date",
            ["short"] = "Data do feriado",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Nome do feriado",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "type",
            ["short"] = "Tipo de feriado",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "feriado",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 2024,
                      ["kind"] = "param",
                      ["name"] = "ano",
                      ["orig"] = "ano",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/feriados/v1/{ano}",
                ["parts"] = {
                  "feriados",
                  "v1",
                  "{ano}",
                },
                ["select"] = {
                  ["exist"] = {
                    "ano",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["fipe_marca"] = {
        ["fields"] = {
          {
            ["name"] = "nome",
            ["short"] = "Nome da marca",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valor",
            ["short"] = "Código da marca",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "fipe_marca",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "carros",
                      ["kind"] = "param",
                      ["name"] = "tipo_veiculo",
                      ["orig"] = "tipo_veiculo",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/fipe/marcas/v1/{tipoVeiculo}",
                ["parts"] = {
                  "fipe",
                  "marcas",
                  "v1",
                  "{tipo_veiculo}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["tipoVeiculo"] = "tipo_veiculo",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "tipo_veiculo",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["fipe_preco"] = {
        ["fields"] = {
          {
            ["name"] = "anoModelo",
            ["short"] = "Ano do modelo",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "codigoFipe",
            ["short"] = "Código FIPE",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "combustivel",
            ["short"] = "Tipo de combustível",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "marca",
            ["short"] = "Marca do veículo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "mesReferencia",
            ["short"] = "Mês de referência da tabela",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "modelo",
            ["short"] = "Modelo do veículo",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "siglaCombustivel",
            ["short"] = "Sigla do combustível",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tipoVeiculo",
            ["short"] = "Tipo do veículo",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "valor",
            ["short"] = "Valor do veículo",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "fipe_preco",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "001004-1",
                      ["kind"] = "param",
                      ["name"] = "codigo_fipe",
                      ["orig"] = "codigo_fipe",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/fipe/preco/v1/{codigoFipe}",
                ["parts"] = {
                  "fipe",
                  "preco",
                  "v1",
                  "{codigo_fipe}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["codigoFipe"] = "codigo_fipe",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "codigo_fipe",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["municipio"] = {
        ["fields"] = {
          {
            ["name"] = "codigo_ibge",
            ["short"] = "Código IBGE do município",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nome",
            ["short"] = "Nome do município",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "municipio",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "SP",
                      ["kind"] = "param",
                      ["name"] = "sigla_uf",
                      ["orig"] = "sigla_uf",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ibge/municipios/v1/{siglaUF}",
                ["parts"] = {
                  "ibge",
                  "municipios",
                  "v1",
                  "{sigla_uf}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["siglaUF"] = "sigla_uf",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "sigla_uf",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
      ["ufn"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["short"] = "ID da UF",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "nome",
            ["short"] = "Nome da UF",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "regiao",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "sigla",
            ["short"] = "Sigla da UF",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "ufn",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ibge/uf/v1",
                ["parts"] = {
                  "ibge",
                  "uf",
                  "v1",
                },
                ["select"] = {
                  ["$action"] = "v1",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "SP",
                      ["kind"] = "param",
                      ["name"] = "sigla_uf",
                      ["orig"] = "sigla_uf",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/ibge/uf/v1/{siglaUF}",
                ["parts"] = {
                  "ibge",
                  "uf",
                  "v1",
                  "{sigla_uf}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["siglaUF"] = "sigla_uf",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "sigla_uf",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.regiao`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "v1",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
