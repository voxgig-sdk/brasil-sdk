import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Ufn, UfnLoadMatch, UfnListMatch } from '../BrasilTypes';
declare class UfnEntity extends BrasilEntityBase<Ufn> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: UfnEntity): UfnEntity;
    load(this: any, reqmatch?: UfnLoadMatch, ctrl?: Control): Promise<UfnEntity>;
    list(this: any, reqmatch?: UfnListMatch, ctrl?: Control): Promise<UfnEntity[]>;
}
export { UfnEntity };
