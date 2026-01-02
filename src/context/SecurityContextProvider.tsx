import Keycloak from "keycloak-js";
import {PropsWithChildren, useEffect, useState} from "react";
import {addAccessTokenToAuthHeader, removeAccessTokenFromAuthHeader} from "@/service/auth.ts";
import {isExpired} from "react-jwt";
import SecurityContext from "@/context/SecurityContext.ts";
import {User} from "@/model/user.ts";
import {useGameStudioStatus} from "@/hooks/useGameStudio.ts";
import {GameStudio} from "@/model/gameStudio.ts";
import {Profile} from "@/model/profile.ts";
import {useProfile} from "@/hooks/useProfile.ts";

const keycloakConfig = {
    url: import.meta.env.VITE_KC_URL,
    realm: import.meta.env.VITE_KC_REALM,
    clientId: import.meta.env.VITE_KC_CLIENT_ID
}

const keycloak: Keycloak = new Keycloak(keycloakConfig);

export default function SecurityContextProvider({children}: PropsWithChildren) {
    const [loggedInUser, setLoggedInUser] = useState<User | undefined>(undefined);
    const [isInitialised, setIsInitialised] = useState(false);
    const {profile, refetch} = useProfile();
    const {gameStudioStatus, refetch: refetchStudio} = useGameStudioStatus();

    useEffect(() => {
        keycloak.init({onLoad: "check-sso"})
    }, []);

    useEffect(() => {
        if (!profile || !gameStudioStatus) return;
        const roles = keycloak.tokenParsed?.realm_access?.roles ?? [];
        setLoggedInUser({...profile, ...gameStudioStatus, roles});
    }, [gameStudioStatus, profile]);

    keycloak.onReady = () => {
        setIsInitialised(true);
    }

    keycloak.onAuthSuccess = async () => {
        addAccessTokenToAuthHeader(keycloak.token);
        try {
            await refetch();
            await refetchStudio();
        } catch (e) {
            console.error("Failed to fetch profile", e);
        }
    }

    keycloak.onAuthLogout = () => {
        removeAccessTokenFromAuthHeader();
    }

    keycloak.onAuthError = () => {
        removeAccessTokenFromAuthHeader();
    }

    keycloak.onTokenExpired = () => {
        keycloak.updateToken(-1).then(async function () {
            addAccessTokenToAuthHeader(keycloak.token);
        })
    }

    function login() {
        keycloak.login();
    }

    function logout() {
        keycloak.logout();
        setLoggedInUser(undefined);
        removeAccessTokenFromAuthHeader();
    }

    function isAuthenticated() {
        if (keycloak.token) return !isExpired(keycloak.token);
        else return false;
    }

    function updateUser() {
        keycloak.accountManagement();
    }

    async function updateProfile(profile: Profile) {
        try {
            if (!loggedInUser) return;
            setLoggedInUser({
                ...loggedInUser,
                ...profile
            })
        } catch (e) {
            console.error("Failed to refetch profile", e);
        }
    }

    async function updateGameStudioStatus(gameStudio: GameStudio) {
        try {
            if (!loggedInUser) return;
            if (gameStudio) {
                setLoggedInUser({
                    ...loggedInUser,
                    hasStudio: true,
                    name: gameStudio.name
                })
            }
        } catch (e) {
            console.error("Failed to update game studio", e);
        }
    }


    return (
        <SecurityContext.Provider value={{
            isInitialised,
            isAuthenticated,
            loggedInUser,
            login,
            logout,
            updateGameStudioStatus,
            updateUser,
            updateProfile
        }}>
            {children}
        </SecurityContext.Provider>
    )
}