import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Feriado, FeriadoLoadMatch } from '../BrasilTypes';
declare class FeriadoEntity extends BrasilEntityBase<Feriado> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: FeriadoEntity): FeriadoEntity;
    load(this: any, reqmatch?: FeriadoLoadMatch, ctrl?: Control): Promise<FeriadoEntity>;
}
export { FeriadoEntity };
