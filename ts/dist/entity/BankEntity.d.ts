import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Bank, BankLoadMatch, BankListMatch } from '../BrasilTypes';
declare class BankEntity extends BrasilEntityBase<Bank> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: BankEntity): BankEntity;
    load(this: any, reqmatch?: BankLoadMatch, ctrl?: Control): Promise<BankEntity>;
    list(this: any, reqmatch?: BankListMatch, ctrl?: Control): Promise<BankEntity[]>;
}
export { BankEntity };
