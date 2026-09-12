import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Ddd, DddLoadMatch } from '../BrasilTypes';
declare class DddEntity extends BrasilEntityBase<Ddd> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: DddEntity): DddEntity;
    load(this: any, reqmatch?: DddLoadMatch, ctrl?: Control): Promise<DddEntity>;
}
export { DddEntity };
