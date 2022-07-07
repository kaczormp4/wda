import { get } from "./rest";
import { IUser } from "./Users";

const url = '/Reports';

interface IReport {
    id: number,
    isCompleted: boolean,
    offerId: number,
    reason: string,
    reportingUser: IUser
}

class Reports {
    public get(): Promise<IReport[]> {
        return get(`${url}/active`);
    }
}

export {
    IReport,
    Reports,
}