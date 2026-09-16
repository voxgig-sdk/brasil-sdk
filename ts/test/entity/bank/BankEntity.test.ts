

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


describe('BankEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRASIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BrasilSDK.test()
    const ent = testsdk.Bank()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRASIL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bank.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"code","req":false,"short":"Código do banco","type":"`$INTEGER`","index$":0},{"active":true,"name":"fullName","req":false,"short":"Nome completo do banco","type":"`$STRING`","index$":1},{"active":true,"name":"ispb","req":false,"short":"Identificador único do banco","type":"`$STRING`","index$":2},{"active":true,"name":"name","req":false,"short":"Nome do banco","type":"`$STRING`","index$":3}],"name":"bank","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /banks/v1","json":"{\"operationId\":\"getBanks\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"code\":{\"description\":\"Código do banco\",\"example\":1,\"type\":\"integer\"},\"fullName\":{\"description\":\"Nome completo do banco\",\"example\":\"Banco do Brasil S.A.\",\"type\":\"string\"},\"ispb\":{\"description\":\"Identificador único do banco\",\"example\":\"00000000\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do banco\",\"example\":\"Banco do Brasil S.A.\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Lista de bancos retornada com sucesso\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/banks/v1","segments":[{"lit":"banks"},{"lit":"v1"}],"select":{"$action":"v1"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"001","kind":"param","name":"code","orig":"code","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /banks/v1/{code}","json":"{\"operationId\":\"getBankByCode\",\"parameters\":[{\"description\":\"Código do banco (3 dígitos)\",\"in\":\"path\",\"name\":\"code\",\"required\":true,\"schema\":{\"example\":\"001\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Código do banco\",\"example\":1,\"type\":\"integer\"},\"fullName\":{\"description\":\"Nome completo do banco\",\"example\":\"Banco do Brasil S.A.\",\"type\":\"string\"},\"ispb\":{\"description\":\"Identificador único do banco\",\"example\":\"00000000\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do banco\",\"example\":\"Banco do Brasil S.A.\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Banco encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Banco não encontrado\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/banks/v1/{code}","segments":[{"lit":"banks"},{"lit":"v1"},{"var":"code"}],"select":{"exist":["code"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["v1"]]},"key$":"bank","name__orig":"bank","Name":"Bank","name_":"bank","name-":"bank","NAME":"BANK","index$":0}, {"active":true,"entity":"bank","key$":"BasicBankFlow","kind":"basic","name":"BasicBankFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"bank_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"bank_ref01","srcdatavar":"bank_ref01_data","suffix":"_dt0"},"match":{"id":"bank01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bank_ref01"}}],"index$":1}]}, 'Bank')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bank_ref01_data = Object.values(setup.data.existing.bank)[0] as any

    // LIST
    const bank_ref01_ent = client.Bank()
    const bank_ref01_match: any = {}

    const bank_ref01_list = (await bank_ref01_ent.list(bank_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bank/BankTestData.json')

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
    ['bank01','bank02','bank03','v101','v102','v103'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRASIL_TEST_BANK_ENTID': idmap,
    'BRASIL_TEST_LIVE': 'FALSE',
    'BRASIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRASIL_TEST_BANK_ENTID']

  const live = 'TRUE' === env.BRASIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRASIL_TEST_BANK_ENTID']
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
  
