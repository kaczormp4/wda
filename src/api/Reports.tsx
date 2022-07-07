import { get, patch } from "./rest";
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
    public toggle(id: number): Promise<string> {
        return patch(`${url}/${id}/toggleCompletion`);
    }
}

export {
    IReport,
    Reports,
}