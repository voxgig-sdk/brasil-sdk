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
(0, node_test_1.describe)('FipePrecoEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRASIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BrasilSDK.test();
        const ent = testsdk.FipePreco();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRASIL_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'fipe_preco.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "anoModelo", "req": false, "short": "Ano do modelo", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "codigoFipe", "req": false, "short": "Código FIPE", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "combustivel", "req": false, "short": "Tipo de combustível", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "marca", "req": false, "short": "Marca do veículo", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "mesReferencia", "req": false, "short": "Mês de referência da tabela", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "modelo", "req": false, "short": "Modelo do veículo", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "siglaCombustivel", "req": false, "short": "Sigla do combustível", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "tipoVeiculo", "req": false, "short": "Tipo do veículo", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "valor", "req": false, "short": "Valor do veículo", "type": "`$STRING`", "index$": 8 }], "name": "fipe_preco", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "001004-1", "kind": "param", "name": "codigo_fipe", "orig": "codigo_fipe", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /fipe/preco/v1/{codigoFipe}", "json": "{\"operationId\":\"getFipePreco\",\"parameters\":[{\"description\":\"Código FIPE do veículo\",\"in\":\"path\",\"name\":\"codigoFipe\",\"required\":true,\"schema\":{\"example\":\"001004-1\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"anoModelo\":{\"description\":\"Ano do modelo\",\"example\":2020,\"type\":\"integer\"},\"codigoFipe\":{\"description\":\"Código FIPE\",\"example\":\"001004-1\",\"type\":\"string\"},\"combustivel\":{\"description\":\"Tipo de combustível\",\"example\":\"Gasolina\",\"type\":\"string\"},\"marca\":{\"description\":\"Marca do veículo\",\"example\":\"Fiat\",\"type\":\"string\"},\"mesReferencia\":{\"description\":\"Mês de referência da tabela\",\"example\":\"janeiro de 2024\",\"type\":\"string\"},\"modelo\":{\"description\":\"Modelo do veículo\",\"example\":\"Palio 1.0\",\"type\":\"string\"},\"siglaCombustivel\":{\"description\":\"Sigla do combustível\",\"example\":\"G\",\"type\":\"string\"},\"tipoVeiculo\":{\"description\":\"Tipo do veículo\",\"example\":1,\"type\":\"integer\"},\"valor\":{\"description\":\"Valor do veículo\",\"example\":\"R$ 50.000,00\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Preço encontrado com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Código FIPE não encontrado\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/fipe/preco/v1/{codigoFipe}", "rename": { "param": { "codigoFipe": "codigo_fipe" } }, "segments": [{ "lit": "fipe" }, { "lit": "preco" }, { "lit": "v1" }, { "var": "codigo_fipe" }], "select": { "exist": ["codigo_fipe"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["v1"]] }, "key$": "fipe_preco", "name__orig": "fipe_preco", "Name": "FipePreco", "name_": "fipe_preco", "name-": "fipe-preco", "NAME": "FIPE_PRECO", "index$": 6 }, { "active": true, "entity": "fipe_preco", "key$": "BasicFipePrecoFlow", "kind": "basic", "name": "BasicFipePrecoFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "fipe_preco_ref01", "srcdatavar": "fipe_preco_ref01_data", "suffix": "_dt0" }, "match": { "id": "fipe_preco01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-fipe_preco_ref01" } }], "index$": 0 }] }, 'FipePreco');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let fipe_preco_ref01_data = Object.values(setup.data.existing.fipe_preco)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const fipe_preco_ref01_ent = client.FipePreco();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/fipe_preco/FipePrecoTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BrasilSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['fipe_preco01', 'fipe_preco02', 'fipe_preco03', 'v101', 'v102', 'v103'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRASIL_TEST_FIPE_PRECO_ENTID': idmap,
        'BRASIL_TEST_LIVE': 'FALSE',
        'BRASIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BRASIL_TEST_FIPE_PRECO_ENTID'];
    const live = 'TRUE' === env.BRASIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRASIL_TEST_FIPE_PRECO_ENTID'];
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
//# sourceMappingURL=FipePrecoEntity.test.js.map