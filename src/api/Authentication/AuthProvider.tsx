import React, { Component } from 'react';
import AuthenticationContext from "./AuthenticationContext";
import { MSALInstance, Scopes } from "./MSALConfig";
import { Account, AuthenticationParameters } from 'msal';

type State = {
    isAuthenticated: boolean;
    authInfo: Account
}

type Props = React.PropsWithChildren<any>;
export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            authInfo: null
        }
    }

    componentDidMount() {
        let account = MSALInstance.getAccount();
        this.setState({
            isAuthenticated: !!account,
            authInfo: account
        })
    }

    logout = async () => {
        await MSALInstance.logout();
    }

    login = async () => {
        try {
            const loginResponse = await MSALInstance.loginPopup({});
            var acc = MSALInstance.getAccount();
            this.setState({ isAuthenticated: !!acc, authInfo: acc });
            MSALInstance.loginRedirect(acc);
        } catch (error) {
            debugger;
        }
    }

    getToken = async () => {
        try {
            let accessToken = await this.acquireToken();
            return accessToken;
        } catch (error) {
            this.setState({ isAuthenticated: false, authInfo: null })
            await this.login();
            let accessToken = await this.acquireToken();
            return accessToken;
        }
    }

    acquireToken = async () => {
        let accessToken: AuthenticationParameters | undefined;
        try {
            accessToken = await MSALInstance.acquireTokenSilent(Scopes);
        }
        catch (error) {
            console.log("AquireTokenSilent failure");
            await MSALInstance.acquireTokenRedirect(Scopes);
            accessToken = null;
        }
        return accessToken;
    }

    render() {
        return (<React.Fragment>
            <AuthenticationContext.Provider value={{
                isAuthenticated: this.state.isAuthenticated,
                authInfo: this.state.authInfo,
                login: this.login,
                logout: this.logout,
                getToken: this.getToken
            }}>
                {this.props.children}
            </AuthenticationContext.Provider>
        </React.Fragment>)
    }
}