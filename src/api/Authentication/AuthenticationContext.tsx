import { Account } from "msal";
import React from "react";


type AuthContext = {
    isAuthenticated: boolean;
    authInfo: Account;
    login: () => any,
    logout: () => any,
    getToken: () => any
}
const AuthenticationContext = React.createContext<AuthContext>({
    isAuthenticated: false,
    authInfo: null,
    login: () => { },
    logout: () => { },
    getToken: () => { }
});

export default AuthenticationContext;