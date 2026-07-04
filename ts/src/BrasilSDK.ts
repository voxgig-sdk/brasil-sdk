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
import { Ufn2Entity } from './entity/Ufn2Entity'

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
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

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


  async direct(fetchargs?: any) {
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



  _bank?: BankEntity

  // Idiomatic facade: `client.bank.list()` / `client.bank.load({ id })`.
  get bank(): BankEntity {
    return (this._bank ??= new BankEntity(this, undefined))
  }

  /** @deprecated Use `client.bank` instead. */
  Bank(data?: any) {
    const self = this
    return new BankEntity(self,data)
  }


  _cep?: CepEntity

  // Idiomatic facade: `client.cep.list()` / `client.cep.load({ id })`.
  get cep(): CepEntity {
    return (this._cep ??= new CepEntity(this, undefined))
  }

  /** @deprecated Use `client.cep` instead. */
  Cep(data?: any) {
    const self = this
    return new CepEntity(self,data)
  }


  _cnpj?: CnpjEntity

  // Idiomatic facade: `client.cnpj.list()` / `client.cnpj.load({ id })`.
  get cnpj(): CnpjEntity {
    return (this._cnpj ??= new CnpjEntity(this, undefined))
  }

  /** @deprecated Use `client.cnpj` instead. */
  Cnpj(data?: any) {
    const self = this
    return new CnpjEntity(self,data)
  }


  _ddd?: DddEntity

  // Idiomatic facade: `client.ddd.list()` / `client.ddd.load({ id })`.
  get ddd(): DddEntity {
    return (this._ddd ??= new DddEntity(this, undefined))
  }

  /** @deprecated Use `client.ddd` instead. */
  Ddd(data?: any) {
    const self = this
    return new DddEntity(self,data)
  }


  _feriado?: FeriadoEntity

  // Idiomatic facade: `client.feriado.list()` / `client.feriado.load({ id })`.
  get feriado(): FeriadoEntity {
    return (this._feriado ??= new FeriadoEntity(this, undefined))
  }

  /** @deprecated Use `client.feriado` instead. */
  Feriado(data?: any) {
    const self = this
    return new FeriadoEntity(self,data)
  }


  _fipe_marca?: FipeMarcaEntity

  // Idiomatic facade: `client.fipe_marca.list()` / `client.fipe_marca.load({ id })`.
  get fipe_marca(): FipeMarcaEntity {
    return (this._fipe_marca ??= new FipeMarcaEntity(this, undefined))
  }

  /** @deprecated Use `client.fipe_marca` instead. */
  FipeMarca(data?: any) {
    const self = this
    return new FipeMarcaEntity(self,data)
  }


  _fipe_preco?: FipePrecoEntity

  // Idiomatic facade: `client.fipe_preco.list()` / `client.fipe_preco.load({ id })`.
  get fipe_preco(): FipePrecoEntity {
    return (this._fipe_preco ??= new FipePrecoEntity(this, undefined))
  }

  /** @deprecated Use `client.fipe_preco` instead. */
  FipePreco(data?: any) {
    const self = this
    return new FipePrecoEntity(self,data)
  }


  _municipio?: MunicipioEntity

  // Idiomatic facade: `client.municipio.list()` / `client.municipio.load({ id })`.
  get municipio(): MunicipioEntity {
    return (this._municipio ??= new MunicipioEntity(this, undefined))
  }

  /** @deprecated Use `client.municipio` instead. */
  Municipio(data?: any) {
    const self = this
    return new MunicipioEntity(self,data)
  }


  _ufn?: UfnEntity

  // Idiomatic facade: `client.ufn.list()` / `client.ufn.load({ id })`.
  get ufn(): UfnEntity {
    return (this._ufn ??= new UfnEntity(this, undefined))
  }

  /** @deprecated Use `client.ufn` instead. */
  Ufn(data?: any) {
    const self = this
    return new UfnEntity(self,data)
  }


  _ufn2?: Ufn2Entity

  // Idiomatic facade: `client.ufn2.list()` / `client.ufn2.load({ id })`.
  get ufn2(): Ufn2Entity {
    return (this._ufn2 ??= new Ufn2Entity(this, undefined))
  }

  /** @deprecated Use `client.ufn2` instead. */
  Ufn2(data?: any) {
    const self = this
    return new Ufn2Entity(self,data)
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

  BaseFeature,
  BrasilEntityBase,

  BrasilSDK,
  SDK,
}


