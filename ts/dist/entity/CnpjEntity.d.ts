import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Cnpj, CnpjLoadMatch } from '../BrasilTypes';
declare class CnpjEntity extends BrasilEntityBase<Cnpj> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: CnpjEntity): CnpjEntity;
    load(this: any, reqmatch?: CnpjLoadMatch, ctrl?: Control): Promise<CnpjEntity>;
}
export { CnpjEntity };
