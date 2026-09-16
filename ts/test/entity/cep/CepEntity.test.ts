

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


describe('CepEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRASIL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BrasilSDK.test()
    const ent = testsdk.Cep()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRASIL_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cep.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"coordinates","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"type","req":false,"type":"`$STRING`","index$":1}],"name":"cep","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"01310100","kind":"param","name":"cep","orig":"cep","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /cep/v1/{cep}","json":"{\"operationId\":\"getCep\",\"parameters\":[{\"description\":\"CEP a ser consultado (apenas números)\",\"in\":\"path\",\"name\":\"cep\",\"required\":true,\"schema\":{\"example\":\"01310100\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cep\":{\"description\":\"CEP consultado\",\"example\":\"01310100\",\"type\":\"string\"},\"city\":{\"description\":\"Nome da cidade\",\"example\":\"São Paulo\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"properties\":{\"latitude\":{\"example\":\"-23.5629358\",\"type\":\"string\"},\"longitude\":{\"example\":\"-46.6527128\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"neighborhood\":{\"description\":\"Nome do bairro\",\"example\":\"Bela Vista\",\"type\":\"string\"},\"service\":{\"description\":\"Serviço utilizado para consulta\",\"example\":\"viacep\",\"type\":\"string\"},\"state\":{\"description\":\"Sigla do estado\",\"example\":\"SP\",\"type\":\"string\"},\"street\":{\"description\":\"Nome da rua\",\"example\":\"Avenida Paulista\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP não encontrado\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cep/v1/{cep}","segments":[{"lit":"cep"},{"lit":"v1"},{"var":"cep"}],"select":{"exist":["cep"]},"transform":{"req":"`reqdata`","res":"`body.location`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"example":"01310100","kind":"param","name":"cep","orig":"cep","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /cep/v2/{cep}","json":"{\"operationId\":\"getCepV2\",\"parameters\":[{\"description\":\"CEP a ser consultado (apenas números)\",\"in\":\"path\",\"name\":\"cep\",\"required\":true,\"schema\":{\"example\":\"01310100\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cep\":{\"description\":\"CEP consultado\",\"example\":\"01310100\",\"type\":\"string\"},\"city\":{\"description\":\"Nome da cidade\",\"example\":\"São Paulo\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"properties\":{\"latitude\":{\"example\":\"-23.5629358\",\"type\":\"string\"},\"longitude\":{\"example\":\"-46.6527128\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"neighborhood\":{\"description\":\"Nome do bairro\",\"example\":\"Bela Vista\",\"type\":\"string\"},\"service\":{\"description\":\"Serviço utilizado para consulta\",\"example\":\"viacep\",\"type\":\"string\"},\"state\":{\"description\":\"Sigla do estado\",\"example\":\"SP\",\"type\":\"string\"},\"street\":{\"description\":\"Nome da rua\",\"example\":\"Avenida Paulista\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP não encontrado\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cep/v2/{cep}","segments":[{"lit":"cep"},{"lit":"v2"},{"var":"cep"}],"select":{"exist":["cep"]},"transform":{"req":"`reqdata`","res":"`body.location`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["v1"],["v2"]]},"key$":"cep","name__orig":"cep","Name":"Cep","name_":"cep","name-":"cep","NAME":"CEP","index$":1}, {"active":true,"entity":"cep","key$":"BasicCepFlow","kind":"basic","name":"BasicCepFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"cep_ref01","srcdatavar":"cep_ref01_data","suffix":"_dt0"},"match":{"id":"cep01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cep_ref01"}}],"index$":0}]}, 'Cep')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cep_ref01_data = Object.values(setup.data.existing.cep)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const cep_ref01_ent = client.Cep()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cep/CepTestData.json')

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
    ['cep01','cep02','cep03','v101','v102','v103','v201','v202','v203'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRASIL_TEST_CEP_ENTID': idmap,
    'BRASIL_TEST_LIVE': 'FALSE',
    'BRASIL_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BRASIL_TEST_CEP_ENTID']

  const live = 'TRUE' === env.BRASIL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRASIL_TEST_CEP_ENTID']
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
  
