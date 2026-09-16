

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


describe('FipeMarcaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRASIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BrasilSDK.test()
    const ent = testsdk.FipeMarca()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRASIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fipe_marca.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"nome","req":false,"short":"Nome da marca","type":"`$STRING`","index$":0},{"active":true,"name":"valor","req":false,"short":"Código da marca","type":"`$STRING`","index$":1}],"name":"fipe_marca","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"carros","kind":"param","name":"tipo_veiculo","orig":"tipo_veiculo","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /fipe/marcas/v1/{tipoVeiculo}","json":"{\"operationId\":\"getFipeMarcas\",\"parameters\":[{\"description\":\"Tipo de veículo (carros, motos ou caminhoes)\",\"in\":\"path\",\"name\":\"tipoVeiculo\",\"required\":true,\"schema\":{\"enum\":[\"carros\",\"motos\",\"caminhoes\"],\"example\":\"carros\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"nome\":{\"description\":\"Nome da marca\",\"example\":\"Fiat\",\"type\":\"string\"},\"valor\":{\"description\":\"Código da marca\",\"example\":\"21\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Lista de marcas retornada com sucesso\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/fipe/marcas/v1/{tipoVeiculo}","rename":{"param":{"tipoVeiculo":"tipo_veiculo"}},"segments":[{"lit":"fipe"},{"lit":"marcas"},{"lit":"v1"},{"var":"tipo_veiculo"}],"select":{"exist":["tipo_veiculo"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["v1"]]},"key$":"fipe_marca","name__orig":"fipe_marca","Name":"FipeMarca","name_":"fipe_marca","name-":"fipe-marca","NAME":"FIPE_MARCA","index$":5}, {"active":true,"entity":"fipe_marca","key$":"BasicFipeMarcaFlow","kind":"basic","name":"BasicFipeMarcaFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"fipe_marca_ref01","srcdatavar":"fipe_marca_ref01_data","suffix":"_dt0"},"match":{"id":"fipe_marca01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-fipe_marca_ref01"}}],"index$":0}]}, 'FipeMarca')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let fipe_marca_ref01_data = Object.values(setup.data.existing.fipe_marca)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const fipe_marca_ref01_ent = client.FipeMarca()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fipe_marca/FipeMarcaTestData.json')

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
    ['fipe_marca01','fipe_marca02','fipe_marca03','v101','v102','v103'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRASIL_TEST_FIPE_MARCA_ENTID': idmap,
    'BRASIL_TEST_LIVE': 'FALSE',
    'BRASIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRASIL_TEST_FIPE_MARCA_ENTID']

  const live = 'TRUE' === env.BRASIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRASIL_TEST_FIPE_MARCA_ENTID']
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
  
