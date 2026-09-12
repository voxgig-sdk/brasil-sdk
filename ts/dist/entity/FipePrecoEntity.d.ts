import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { FipePreco, FipePrecoLoadMatch } from '../BrasilTypes';
declare class FipePrecoEntity extends BrasilEntityBase<FipePreco> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: FipePrecoEntity): FipePrecoEntity;
    load(this: any, reqmatch?: FipePrecoLoadMatch, ctrl?: Control): Promise<FipePrecoEntity>;
}
export { FipePrecoEntity };
