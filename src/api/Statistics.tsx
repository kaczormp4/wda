import { get } from './rest';

const url = '/Statistics';

interface IStatistics {
  amountOfReports: number;
  amountOfUsers: number;
  offersCreated: number;
}

class Statistics {
  public get(): Promise<IStatistics> {
    return get(`${url}`);
  }
}

export { IStatistics, Statistics };
