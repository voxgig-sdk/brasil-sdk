// Brasil Ts SDK

import { BankEntity } from './entity/BankEntity'
import { CepEntity } from './entity/CepEntity'
import { CnpjEntity } from './entity/CnpjEntity'
import { DddEntity } from './entity/DddEntity'
import { FeriadoEntity } from './entity/FeriadoEntity'
import { FipeMarcaEntity } from './entity/FipeMarcaEntity'
import { FipePrecoEntity } from './entity/FipePrecoEntity'
import { MunicipioEntity } from './entity/MunicipioEntity'
import { UfnEntity } from './entity/UfnEntity'

export type * from './BrasilTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { BrasilEntityBase } from './BrasilEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class BrasilSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('BrasilSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  // Raw GraphQL access: the pressure valve that makes the generated
  // surface's deliberate omissions (per-call selection sets, typed filter
  // builders, batching, subscriptions) livable — the whole schema stays
  // reachable.
  //
  // Thin wrapper over the same prepare/fetch path `direct` uses, with the
  // one thing raw `direct` cannot do for GraphQL: a GraphQL failure rides
  // HTTP 200 as a top-level `errors` array, so status alone would report a
  // failed query as ok.
  //
  // NOTE: like `direct`, this bypasses the feature pipeline — no retry,
  // ratelimit or paging features apply.
  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('BrasilSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('BrasilSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Bank().list()` / `client.Bank().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Bank(entopts?: Record<string, any>) {
    const self = this
    return new BankEntity(self, entopts)
  }


  // Entity access: `client.Cep().list()` / `client.Cep().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Cep(entopts?: Record<string, any>) {
    const self = this
    return new CepEntity(self, entopts)
  }


  // Entity access: `client.Cnpj().list()` / `client.Cnpj().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Cnpj(entopts?: Record<string, any>) {
    const self = this
    return new CnpjEntity(self, entopts)
  }


  // Entity access: `client.Ddd().list()` / `client.Ddd().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Ddd(entopts?: Record<string, any>) {
    const self = this
    return new DddEntity(self, entopts)
  }


  // Entity access: `client.Feriado().list()` / `client.Feriado().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Feriado(entopts?: Record<string, any>) {
    const self = this
    return new FeriadoEntity(self, entopts)
  }


  // Entity access: `client.FipeMarca().list()` / `client.FipeMarca().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FipeMarca(entopts?: Record<string, any>) {
    const self = this
    return new FipeMarcaEntity(self, entopts)
  }


  // Entity access: `client.FipePreco().list()` / `client.FipePreco().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  FipePreco(entopts?: Record<string, any>) {
    const self = this
    return new FipePrecoEntity(self, entopts)
  }


  // Entity access: `client.Municipio().list()` / `client.Municipio().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Municipio(entopts?: Record<string, any>) {
    const self = this
    return new MunicipioEntity(self, entopts)
  }


  // Entity access: `client.Ufn().list()` / `client.Ufn().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Ufn(entopts?: Record<string, any>) {
    const self = this
    return new UfnEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new BrasilSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return BrasilSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Brasil' }
  }

  toString() {
    return 'Brasil ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = BrasilSDK


export {
  stdutil,
  config,

  BaseFeature,
  BrasilEntityBase,

  BrasilSDK,
  SDK,
}


