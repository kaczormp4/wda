import * as msal from "msal";

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //to dla testow tylko
const msalConfig = {
    auth: {
        clientId: '3c0e930d-c458-4807-9ad1-5d052c8abbc5',
        authority: 'https://wesela.b2clogin.com/wesela.onmicrosoft.com/B2C_1_susi',
        validateAuthority: false,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" to save cache in cookies to address trusted zones limitations in IE (see: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/Known-issues-on-IE-and-Edge-Browser)
    }
};

const scopes = [
    "https://wesela.onmicrosoft.com/f6fe86fe-cdac-4538-b614-b2f9afdbaf55/access_as_user"
]

const msalInstance = new msal.UserAgentApplication(msalConfig);

export const MSALInstance = msalInstance;

export const Scopes = { scopes: scopes };