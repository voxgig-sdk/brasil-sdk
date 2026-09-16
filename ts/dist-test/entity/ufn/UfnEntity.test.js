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
(0, node_test_1.describe)('UfnEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRASIL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRASIL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BrasilSDK.test();
        const ent = testsdk.Ufn();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRASIL_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ufn.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "short": "ID da UF", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "nome", "req": false, "short": "Nome da UF", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "regiao", "req": false, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "sigla", "req": false, "short": "Sigla da UF", "type": "`$STRING`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "ufn", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /ibge/uf/v1", "json": "{\"operationId\":\"getIbgeUFs\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"ID da UF\",\"example\":35,\"type\":\"integer\"},\"nome\":{\"description\":\"Nome da UF\",\"example\":\"São Paulo\",\"type\":\"string\"},\"regiao\":{\"properties\":{\"id\":{\"example\":3,\"type\":\"integer\"},\"nome\":{\"example\":\"Sudeste\",\"type\":\"string\"},\"sigla\":{\"example\":\"SE\",\"type\":\"string\"}},\"type\":\"object\"},\"sigla\":{\"description\":\"Sigla da UF\",\"example\":\"SP\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Lista de UFs retornada com sucesso\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/ibge/uf/v1", "segments": [{ "lit": "ibge" }, { "lit": "uf" }, { "lit": "v1" }], "select": { "$action": "v1" }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "SP", "kind": "param", "name": "sigla_uf", "orig": "sigla_uf", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /ibge/uf/v1/{siglaUF}", "json": "{\"operationId\":\"getIbgeUF\",\"parameters\":[{\"description\":\"Sigla da UF (2 caracteres)\",\"in\":\"path\",\"name\":\"siglaUF\",\"required\":true,\"schema\":{\"example\":\"SP\",\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"ID da UF\",\"example\":35,\"type\":\"integer\"},\"nome\":{\"description\":\"Nome da UF\",\"example\":\"São Paulo\",\"type\":\"string\"},\"regiao\":{\"properties\":{\"id\":{\"example\":3,\"type\":\"integer\"},\"nome\":{\"example\":\"Sudeste\",\"type\":\"string\"},\"sigla\":{\"example\":\"SE\",\"type\":\"string\"}},\"type\":\"object\"},\"sigla\":{\"description\":\"Sigla da UF\",\"example\":\"SP\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"UF encontrada com sucesso\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"description\":\"Mensagem de erro\",\"example\":\"Recurso não encontrado\",\"type\":\"string\"},\"name\":{\"description\":\"Nome do erro\",\"example\":\"NotFoundError\",\"type\":\"string\"},\"type\":{\"description\":\"Tipo do erro\",\"example\":\"not_found\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"UF não encontrada\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/ibge/uf/v1/{siglaUF}", "rename": { "param": { "siglaUF": "sigla_uf" } }, "segments": [{ "lit": "ibge" }, { "lit": "uf" }, { "lit": "v1" }, { "var": "sigla_uf" }], "select": { "exist": ["sigla_uf"] }, "transform": { "req": "`reqdata`", "res": "`body.regiao`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["v1"]] }, "key$": "ufn", "name__orig": "ufn", "Name": "Ufn", "name_": "ufn", "name-": "ufn", "NAME": "UFN", "index$": 8 }, { "active": true, "entity": "ufn", "key$": "BasicUfnFlow", "kind": "basic", "name": "BasicUfnFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "ufn_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "ufn_ref01", "srcdatavar": "ufn_ref01_data", "suffix": "_dt0" }, "match": { "id": "ufn01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ufn_ref01" } }], "index$": 1 }] }, 'Ufn');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let ufn_ref01_data = Object.values(setup.data.existing.ufn)[0];
        // LIST
        const ufn_ref01_ent = client.Ufn();
        const ufn_ref01_match = {};
        const ufn_ref01_list = (await ufn_ref01_ent.list(ufn_ref01_match)).map((e) => e.data());
        // LOAD
        const ufn_ref01_match_dt0 = {};
        ufn_ref01_match_dt0.id = ufn_ref01_data.id;
        const ufn_ref01_data_dt0 = (await ufn_ref01_ent.load(ufn_ref01_match_dt0)).data();
        (0, node_assert_1.default)(ufn_ref01_data_dt0.id === ufn_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ufn/UfnTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BrasilSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ufn01', 'ufn02', 'ufn03', 'v101', 'v102', 'v103'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRASIL_TEST_UFN_ENTID': idmap,
        'BRASIL_TEST_LIVE': 'FALSE',
        'BRASIL_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['BRASIL_TEST_UFN_ENTID'];
    const live = 'TRUE' === env.BRASIL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRASIL_TEST_UFN_ENTID'];
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
//# sourceMappingURL=UfnEntity.test.js.map