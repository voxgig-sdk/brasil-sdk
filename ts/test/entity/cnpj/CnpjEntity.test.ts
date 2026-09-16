

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BrasilSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CnpjEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRASIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BrasilSDK.test()
    const ent = testsdk.Cnpj()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRASIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cnpj.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bairro","req":false,"short":"Bairro","type":"`$STRING`","index$":0},{"active":true,"name":"capital_social","req":false,"short":"Capital social da empresa","type":"`$NUMBER`","index$":1},{"active":true,"name":"cep","req":false,"short":"CEP","type":"`$STRING`","index$":2},{"active":true,"name":"cnae_fiscal","req":false,"short":"CNAE fiscal principal","type":"`$INTEGER`","index$":3},{"active":true,"name":"cnae_fiscal_descricao","req":false,"short":"Descrição do CNAE fiscal","type":"`$STRING`","index$":4},{"active":true,"name":"cnpj","req":false,"short":"CNPJ consultado","type":"`$STRING`","index$":5},{"active":true,"name":"complemento","req":false,"short":"Complemento do endereço","type":"`$STRING`","index$":6},{"active":true,"format":"date","name":"data_inicio_atividade","req":false,"short":"Data de início das atividades","type":"`$STRING`","index$":7},{"active":true,"name":"ddd_telefone_1","req":false,"short":"Telefone principal","type":"`$STRING`","index$":8},{"active":true,"name":"logradouro","req":false,"short":"Logradouro do endereço","type":"`$STRING`","index$":9},{"active":true,"name":"municipio","req":false,"short":"Município","type":"`$STRING`","index$":10},{"active":true,"name":"natureza_juridica","req":false,"short":"Código da natureza jurídica","type":"`$STRING`","index$":11},{"active":true,"name":"nome_fantasia","req":false,"short":"Nome fantasia da empresa","type":"`$STRING`","index$":12},{"active":true,"name":"numero","req":false,"short":"Número do endereço","type":"`$STRING`","index$":13},{"active":true,"name":"porte","req":false,"short":"Porte da empresa","type":"`$STRING`","index$":14},{"active":true,"name":"qsa","req":false,"short":"Quadro de sócios e administradores","type":"`$ARRAY`","index$":15},{"active":true,"name":"razao_social","req":false,"short":"Razão social da empresa","type":"`$STRING`","index$":16},{"active":true,"name":"uf","req":false,"short":"UF","type":"`$STRING`","index$":17}],"name":"cnpj","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"00000000000191","kind":"param","name":"cnpj","orig":"cnpj","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /cnpj/v1/{cnpj}","json":"{\"operationId\":\"getCnpj\",\"parameters\":[{\"description\":\"CNPJ a ser consultado (apenas números)\",\"in\":\"path\",\"name\":\"cnpj\",\"required\":true,\"schema\":{\"example\":\"00000000000191\",\"pattern\":\"^[0-9]{14}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bairro\":{\"description\":\"Bairro\",\"type\":\"string\"},\"capital_social\":{\"description\":\"Capital social da empresa\",\"type\":\"number\"},\"cep\":{\"description\":\"CEP\",\"type\":\"string\"},\"cnae_fiscal\":{\"description\":\"CNAE fiscal principal\",\"type\":\"integer\"},\"cnae_fiscal_descricao\":{\"description\":\"Descrição do CNAE fiscal\",\"type\":\"string\"},\"cnpj\":{\"description\":\"CNPJ consultado\",\"example\":\"00000000000191\",\"type\":\"string\"},\"complemento\":{\"description\":\"Complemento do endereço\",\"type\":\"string\"},\"data_inicio_atividade\":{\"description\":\"Data de início das atividades\",\"format\":\"date\",\"type\":\"string\"},\"ddd_telefone_1\":{\"description\":\"Telefone principal\",\"type\":\"string\"},\"logradouro\":{\"description\":\"Logradouro do endereço\",\"type\":\"string\"},\"municipio\":{\"description\":\"Município\",\"type\":\"string\"},\"natureza_juridica\":{\"description\":\"Código da natureza jurídica\",\"type\":\"string\"},\"nome_fantasia\":{\"description\":\"Nome fantasia da empresa\",\"example\":\"BANCO DO BRASIL\",\"type\":\"string\"},\"numero\":{\"description\":\"Número do endereço\",\"type\":\"string\"},\"porte\":{\"description\":\"Porte da empresa\",\"type\":\"string\"},\"qsa\":{\"description\":\"Quadro de sócios e administradores\",\"items\":{\"properties\":{\"nome\":{\"type\":\"string\"},\"qual\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"razao_social\":{\"description\":\"Razão social da empresa\",\"example\":\"BANCO DO BRASIL S.A.\",\"type\":\"string\"},\"uf\":{\"description\":\"UF\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CNPJ encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CNPJ não encontrado\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cnpj/v1/{cnpj}","segments":[{"lit":"cnpj"},{"lit":"v1"},{"var":"cnpj"}],"select":{"exist":["cnpj"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["v1"]]},"key$":"cnpj","name__orig":"cnpj","Name":"Cnpj","name_":"cnpj","name-":"cnpj","NAME":"CNPJ","index$":2}, {"active":true,"entity":"cnpj","key$":"BasicCnpjFlow","kind":"basic","name":"BasicCnpjFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"cnpj_ref01","srcdatavar":"cnpj_ref01_data","suffix":"_dt0"},"match":{"id":"cnpj01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cnpj_ref01"}}],"index$":0}]}, 'Cnpj')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cnpj_ref01_data = Object.values(setup.data.existing.cnpj)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const cnpj_ref01_ent = client.Cnpj()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cnpj/CnpjTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BrasilSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['cnpj01','cnpj02','cnpj03','v101','v102','v103'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRASIL_TEST_CNPJ_ENTID': idmap,
    'BRASIL_TEST_LIVE': 'FALSE',
    'BRASIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRASIL_TEST_CNPJ_ENTID']

  const live = 'TRUE' === env.BRASIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRASIL_TEST_CNPJ_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BrasilSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BRASIL_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
