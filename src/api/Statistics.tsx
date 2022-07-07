import { get } from "./rest";

const url = '/Statistics';

interface IStatistics {
    id: number,
    isCompleted: boolean,
    offerId: number,
    reason: string,
}

class Statistics {
    public get(): Promise<IStatistics[]> {
        return get(`${url}`);
    }
}

export {
    IStatistics,
    Statistics,
}