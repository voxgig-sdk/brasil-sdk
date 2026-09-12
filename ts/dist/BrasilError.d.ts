import { Context } from './Context';
declare class BrasilError extends Error {
    isBrasilError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BrasilError };
