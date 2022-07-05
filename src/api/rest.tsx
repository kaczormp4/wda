import axios, { AxiosError } from "axios";
import { setupCache } from 'axios-cache-adapter';
import { toast } from 'react-toastify';
import { MSALInstance, Scopes } from "./Authentication/MSALConfig";

const apiURL = 'https://weddings.azurewebsites.net/api';

// cache setup
const cache = setupCache({
    maxAge: 3 * 60 * 1000, // 3min
    clearOnError: true
});

const api = axios.create({
    adapter: cache.adapter
});

// interceptor setup
api.interceptors.request.use(
    async function (req) {
        const account = await MSALInstance.getAccount();
        if(account) {
            const accessToken = await MSALInstance.acquireTokenSilent(Scopes);
            req.headers['Authorization'] = `Bearer ${accessToken.accessToken}`;
        }
        req.headers['Content-Type'] = `multipart/form-data; boundary=--14737809831466499882746641449`;
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// generic converter from object to string args 
function argsToString(args: object): string {
    let argsString: string = '?';
    for (const [key, value] of Object.entries(args)) {
        if (value) {
            argsString += `${key}=${value}${argsString.length >= 1 ? '&' : ''}`;
        }
    }

    return argsString.length > 1 ? argsString : '';
}

const handleError = (error: AxiosError) => {
    console.error(error.request);
    const toastMessage = error.request.responseText || (`${error.request.status}: ${error.request.statusText}`); 
    toast.error(toastMessage);
}

/*
/////
REST methods
/////
*/
function get(url: string, urlParams: string = '') {
    return api.get(`${apiURL}${url}${urlParams}`).then((response) => {
        console.log({store: cache.store});

        return response.data;
    }).catch(error => {
        throw handleError(error);
    });
}

function post(url: string, payload: Object) {
    return api.post(`${apiURL}${url}`, payload).then((response) => {
        return response.data;
    }).catch(error => {
        throw  handleError(error);
    });
}

function remove(url: string, urlParams: string = '') {
    return api.delete(`${apiURL}${url}${urlParams}`).then((response) => {
        console.log(response);
        return response.data;
    }).catch(error => {
        throw handleError(error);
    });
}

// TODO put


export {
    get,
    post,
    remove,
    argsToString,
    apiURL
}