import { get } from "./rest";

const url = '/Buggy';

class Buggy {
    public getBadRequest() {
        return get(url, '/BadRequest');
    }

    public getUnauthorized() {
        return get(url, '/Unauthorized');
    }

    public getNotFound() {
        return get(url, '/NotFound');
    }

    public getServerError() {
        return get(url, '/ServerError');
    }
}

export default Buggy;