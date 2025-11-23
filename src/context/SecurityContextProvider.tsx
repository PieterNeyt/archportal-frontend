import Keycloak from "keycloak-js";
import {PropsWithChildren, useEffect, useState} from "react";
import {User} from "@/model/user.ts";
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from "@/service/auth.ts";
import {isExpired} from "react-jwt";
import SecurityContext from "@/context/SecurityContext.ts";

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID
}

const keycloak: Keycloak = new Keycloak(keycloakConfig);

export default function SecurityContextProvider({children}: PropsWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
    const [isInitialised, setIsInitialised] = useState(false);

    useEffect(() => {
        keycloak.init({onLoad: "check-sso"})
    }, [])

    keycloak.onReady = () => {
        setIsInitialised(true);
    }

    keycloak.onAuthSuccess = () => {
        addAccessTokenToAuthHeader(keycloak.token);
        updateUserFromToken()
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader();
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader();
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(function () {
            addAccessTokenToAuthHeader(keycloak.token);
            updateUserFromToken();
        })
    }

    function login() {
        keycloak.login();
    }

    function logout() {
        keycloak.logout();
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token);
        else return false;
    }

    function updateUserFromToken() {
        if (!keycloak.idTokenParsed || !keycloak.tokenParsed) return

        const name = keycloak.idTokenParsed.given_name;
        const realmRoles = keycloak.tokenParsed.realm_access?.roles ?? [];

        setLoggedInUser({
            name,
            roles: realmRoles
        })
    }

    return (
        <SecurityContext.Provider
            value={{isInitialised, isAuthenticated, loggedInUser, login, logout}}
        >
            {children}
        </SecurityContext.Provider>
    )
}