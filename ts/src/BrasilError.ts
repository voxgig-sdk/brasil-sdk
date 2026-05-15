
import { Context } from './Context'


class BrasilError extends Error {

  isBrasilError = true

  sdk = 'Brasil'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  BrasilError
}

