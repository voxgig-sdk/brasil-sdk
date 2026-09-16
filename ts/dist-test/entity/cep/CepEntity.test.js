"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CepEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRASIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BrasilSDK.test();
        const ent = testsdk.Cep();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRASIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cep.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "coordinates", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "type", "req": false, "type": "`$STRING`", "index$": 1 }], "name": "cep", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "01310100", "kind": "param", "name": "cep", "orig": "cep", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /cep/v1/{cep}", "json": "{\"operationId\":\"getCep\",\"parameters\":[{\"description\":\"CEP a ser consultado (apenas números)\",\"in\":\"path\",\"name\":\"cep\",\"required\":true,\"schema\":{\"example\":\"01310100\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cep\":{\"description\":\"CEP consultado\",\"example\":\"01310100\",\"type\":\"string\"},\"city\":{\"description\":\"Nome da cidade\",\"example\":\"São Paulo\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"properties\":{\"latitude\":{\"example\":\"-23.5629358\",\"type\":\"string\"},\"longitude\":{\"example\":\"-46.6527128\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"neighborhood\":{\"description\":\"Nome do bairro\",\"example\":\"Bela Vista\",\"type\":\"string\"},\"service\":{\"description\":\"Serviço utilizado para consulta\",\"example\":\"viacep\",\"type\":\"string\"},\"state\":{\"description\":\"Sigla do estado\",\"example\":\"SP\",\"type\":\"string\"},\"street\":{\"description\":\"Nome da rua\",\"example\":\"Avenida Paulista\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP não encontrado\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cep/v1/{cep}", "segments": [{ "lit": "cep" }, { "lit": "v1" }, { "var": "cep" }], "select": { "exist": ["cep"] }, "transform": { "req": "`reqdata`", "res": "`body.location`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "example": "01310100", "kind": "param", "name": "cep", "orig": "cep", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /cep/v2/{cep}", "json": "{\"operationId\":\"getCepV2\",\"parameters\":[{\"description\":\"CEP a ser consultado (apenas números)\",\"in\":\"path\",\"name\":\"cep\",\"required\":true,\"schema\":{\"example\":\"01310100\",\"pattern\":\"^[0-9]{8}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"cep\":{\"description\":\"CEP consultado\",\"example\":\"01310100\",\"type\":\"string\"},\"city\":{\"description\":\"Nome da cidade\",\"example\":\"São Paulo\",\"type\":\"string\"},\"location\":{\"properties\":{\"coordinates\":{\"properties\":{\"latitude\":{\"example\":\"-23.5629358\",\"type\":\"string\"},\"longitude\":{\"example\":\"-46.6527128\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"example\":\"Point\",\"type\":\"string\"}},\"type\":\"object\"},\"neighborhood\":{\"description\":\"Nome do bairro\",\"example\":\"Bela Vista\",\"type\":\"string\"},\"service\":{\"description\":\"Serviço utilizado para consulta\",\"example\":\"viacep\",\"type\":\"string\"},\"state\":{\"description\":\"Sigla do estado\",\"example\":\"SP\",\"type\":\"string\"},\"street\":{\"description\":\"Nome da rua\",\"example\":\"Avenida Paulista\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"CEP não encontrado\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/cep/v2/{cep}", "segments": [{ "lit": "cep" }, { "lit": "v2" }, { "var": "cep" }], "select": { "exist": ["cep"] }, "transform": { "req": "`reqdata`", "res": "`body.location`" }, "index$": 1 }], "key$": "load" } }, "relations": { "ancestors": [["v1"], ["v2"]] }, "key$": "cep", "name__orig": "cep", "Name": "Cep", "name_": "cep", "name-": "cep", "NAME": "CEP", "index$": 1 }, { "active": true, "entity": "cep", "key$": "BasicCepFlow", "kind": "basic", "name": "BasicCepFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "cep_ref01", "srcdatavar": "cep_ref01_data", "suffix": "_dt0" }, "match": { "id": "cep01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-cep_ref01" } }], "index$": 0 }] }, 'Cep');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let cep_ref01_data = Object.values(setup.data.existing.cep)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const cep_ref01_ent = client.Cep();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cep/CepTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BrasilSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cep01', 'cep02', 'cep03', 'v101', 'v102', 'v103', 'v201', 'v202', 'v203'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRASIL_TEST_CEP_ENTID': idmap,
        'BRASIL_TEST_LIVE': 'FALSE',
        'BRASIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BRASIL_TEST_CEP_ENTID'];
    const live = 'TRUE' === env.BRASIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRASIL_TEST_CEP_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BrasilSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=CepEntity.test.js.map