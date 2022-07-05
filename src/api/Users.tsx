import { get } from './rest';

const url = '/users';

interface IUser {
  userIdentifier: string;
  givenName: string | null;
  surname: string | null;
}

class Users {
  public get(id: string): Promise<IUser> {
    return get(url, `/${id}`);
  }
}

export { IUser, Users };
