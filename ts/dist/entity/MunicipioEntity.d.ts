import { BrasilEntityBase } from '../BrasilEntityBase';
import type { BrasilSDK } from '../BrasilSDK';
import type { Control } from '../types';
import type { Municipio, MunicipioLoadMatch } from '../BrasilTypes';
declare class MunicipioEntity extends BrasilEntityBase<Municipio> {
    constructor(client: BrasilSDK, entopts: any);
    make(this: MunicipioEntity): MunicipioEntity;
    load(this: any, reqmatch?: MunicipioLoadMatch, ctrl?: Control): Promise<MunicipioEntity>;
}
export { MunicipioEntity };
