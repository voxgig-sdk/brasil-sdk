

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


describe('FeriadoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRASIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BrasilSDK.test()
    const ent = testsdk.Feriado()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRASIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'feriado.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"date","req":false,"short":"Data do feriado","type":"`$STRING`","index$":0},{"active":true,"name":"name","req":false,"short":"Nome do feriado","type":"`$STRING`","index$":1},{"active":true,"name":"type","req":false,"short":"Tipo de feriado","type":"`$STRING`","index$":2}],"name":"feriado","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":2024,"kind":"param","name":"ano","orig":"ano","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /feriados/v1/{ano}","json":"{\"operationId\":\"getFeriados\",\"parameters\":[{\"description\":\"Ano a ser consultado\",\"in\":\"path\",\"name\":\"ano\",\"required\":true,\"schema\":{\"example\":2024,\"maximum\":2100,\"minimum\":1900,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"date\":{\"description\":\"Data do feriado\",\"example\":\"2024-01-01\",\"format\":\"date\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do feriado\",\"example\":\"Ano Novo\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo de feriado\",\"example\":\"national\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Lista de feriados retornada com sucesso\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/feriados/v1/{ano}","segments":[{"lit":"feriados"},{"lit":"v1"},{"var":"ano"}],"select":{"exist":["ano"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["v1"]]},"key$":"feriado","name__orig":"feriado","Name":"Feriado","name_":"feriado","name-":"feriado","NAME":"FERIADO","index$":4}, {"active":true,"entity":"feriado","key$":"BasicFeriadoFlow","kind":"basic","name":"BasicFeriadoFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"feriado_ref01","srcdatavar":"feriado_ref01_data","suffix":"_dt0"},"match":{"id":"feriado01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-feriado_ref01"}}],"index$":0}]}, 'Feriado')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let feriado_ref01_data = Object.values(setup.data.existing.feriado)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const feriado_ref01_ent = client.Feriado()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/feriado/FeriadoTestData.json')

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
    ['feriado01','feriado02','feriado03','v101','v102','v103'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRASIL_TEST_FERIADO_ENTID': idmap,
    'BRASIL_TEST_LIVE': 'FALSE',
    'BRASIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRASIL_TEST_FERIADO_ENTID']

  const live = 'TRUE' === env.BRASIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRASIL_TEST_FERIADO_ENTID']
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
  
