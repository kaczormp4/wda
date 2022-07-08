import { get, patch } from './rest';

const url = '/users';

interface IUser {
  userIdentifier: string;
  givenName: string | null;
  surname: string | null;
}

interface IUserEdit {
  givenName: string;
  surname: string;
  description: string;
}

class Users {
  public get(id: string): Promise<IUser> {
    return get(url, `/${id}`);
  }

  public patch(id: IUser['userIdentifier'], user: IUserEdit): Promise<string> {
    return patch(`${url}/${id}/update`, user);
  }
}

export { IUser, IUserEdit, Users };
