import {createContext} from "react";
import {User} from "@/model/user.ts";
import {GameStudio} from "@/model/gameStudio.ts";

export type SecurityContext = {
    isInitialised: boolean;
    isAuthenticated: () => boolean;
    loggedInUser: User | undefined;
    login: () => void;
    logout: () => void;
    updateGameStudioStatus: (gameStudio: GameStudio) => void;
    updateUser: () => void;
    refetchProfile: () => Promise<void>;
}

export default createContext<SecurityContext>({
    isInitialised: false,
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: () => {
    },
    logout: () => {
    },
    updateGameStudioStatus: () => {
    },
    updateUser: () => {
    },
    refetchProfile: async () => {},
})