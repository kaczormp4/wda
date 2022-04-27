import { get } from "./rest";

const url = '/PriceUnits';

interface IPriceUnit {
    id?: number,
    unit: string
}

class PriceUnits {
    public get(): Promise<IPriceUnit[]> {
        return get(url);
    }
}

export {
    IPriceUnit,
    PriceUnits,
}