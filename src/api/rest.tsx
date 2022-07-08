import axios, { AxiosError } from 'axios';
import { setup, setupCache } from 'axios-cache-adapter';
import { toast } from 'react-toastify';
import { MSALInstance, Scopes } from './Authentication/MSALConfig';

const apiURL = 'https://weddings.azurewebsites.net/api';

// cache setup
const cache = setupCache({
  maxAge: 3 * 60 * 1000, // 3min
  clearOnError: true,
  invalidate: async (config: any, request) => {
    if (request.clearCacheEntry) {
      await (config.store as any).clear()
    }
  }
});

const api = axios.create({
  adapter: cache.adapter,
});


// interceptor setup
api.interceptors.request.use(
  async function (req) {
    const account = await MSALInstance.getAccount();
    if (account) {
      try {
        const accessToken = await MSALInstance.acquireTokenSilent(Scopes);
        req.headers['Authorization'] = `Bearer ${accessToken.accessToken}`;
      }
      catch(e) {
        console.log(e);
        toast.info("Sesja zakończona. Zostałeś wylogowany/a");
        MSALInstance.logout();
      }
    }
    if(req.params === 'useFormData') {
      req.headers['Content-Type'] = `multipart/form-data; boundary=--14737809831466499882746641449`;
    } else {
      req.headers['Content-Type'] = `application/json`;
    }

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
  console.error(error);
  const toastMessage =
    error.request?.responseText || `${error.request?.status}: ${error.request?.statusText}`;
  toast.error(toastMessage);
};

/*
/////
REST methods
/////
*/
function get(url: string, urlParams: string = '') {
  return api
    .get(`${apiURL}${url}${urlParams}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw handleError(error);
    });
}

function post(url: string, payload: Object, useFormData?: boolean) {
  return api
    .post(`${apiURL}${url}`, payload, {params: useFormData ? 'useFormData' : '' })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw handleError(error);
    });
}

function remove(url: string, urlParams: string = '') {
  return api
    .delete(`${apiURL}${url}${urlParams}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw handleError(error);
    });
}

function patch(url: string, payload?: Object) {
  return api
    .patch(`${apiURL}${url}`, payload, {clearCacheEntry: true})
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw handleError(error);
    });
}
// TODO put

export { get, post, remove, patch, argsToString, apiURL };
