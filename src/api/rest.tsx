import axios, { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify';

const apiURL = 'https://weddings.azurewebsites.net/api';

// interceptor setup
axios.interceptors.request.use(
    function (req) {
        const token = "no-token";
        req.headers['Authorization'] = `Bearer ${token}`;
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
    return axios.get(`${apiURL}${url}${urlParams}`).then((response) => {
        return response.data;
    }).catch(error => {
        throw handleError(error);
    });
}

function post(url: string, payload: Object) {
    return axios.post(`${apiURL}${url}`, payload).then((response) => {
        return response.data;
    }).catch(error => {
        throw  handleError(error);
    });
}

function remove(url: string, urlParams: string = '') {
    return axios.delete(`${apiURL}${url}${urlParams}`).then((response) => {
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