import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { FipeMarca, FipeMarcaLoadMatch } from '../BrasilTypes';
declare class FipeMarcaEntity extends BrasilEntityBase<FipeMarca> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: FipeMarcaEntity): FipeMarcaEntity;
    load(this: any, reqmatch?: FipeMarcaLoadMatch, ctrl?: Control): Promise<FipeMarcaEntity>;
}
export { FipeMarcaEntity };
