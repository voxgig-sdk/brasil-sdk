import { BankEntity } from './entity/BankEntity';
import { CepEntity } from './entity/CepEntity';
import { CnpjEntity } from './entity/CnpjEntity';
import { DddEntity } from './entity/DddEntity';
import { FeriadoEntity } from './entity/FeriadoEntity';
import { FipeMarcaEntity } from './entity/FipeMarcaEntity';
import { FipePrecoEntity } from './entity/FipePrecoEntity';
import { MunicipioEntity } from './entity/MunicipioEntity';
import { UfnEntity } from './entity/UfnEntity';
export type * from './BrasilTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { BrasilEntityBase } from './BrasilEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class BrasilSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Bank(entopts?: Record<string, any>): BankEntity;
    Cep(entopts?: Record<string, any>): CepEntity;
    Cnpj(entopts?: Record<string, any>): CnpjEntity;
    Ddd(entopts?: Record<string, any>): DddEntity;
    Feriado(entopts?: Record<string, any>): FeriadoEntity;
    FipeMarca(entopts?: Record<string, any>): FipeMarcaEntity;
    FipePreco(entopts?: Record<string, any>): FipePrecoEntity;
    Municipio(entopts?: Record<string, any>): MunicipioEntity;
    Ufn(entopts?: Record<string, any>): UfnEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): BrasilSDK;
    tester(testopts?: any, sdkopts?: any): BrasilSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof BrasilSDK;
export { stdutil, config, BaseFeature, BrasilEntityBase, BrasilSDK, SDK, };
