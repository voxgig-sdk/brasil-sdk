import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Cep, CepLoadMatch } from '../BrasilTypes';
declare class CepEntity extends BrasilEntityBase<Cep> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: CepEntity): CepEntity;
    load(this: any, reqmatch?: CepLoadMatch, ctrl?: Control): Promise<CepEntity>;
}
export { CepEntity };
