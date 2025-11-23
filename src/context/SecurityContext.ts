import {createContext} from "react";
import {User} from "@/model/user.ts";

export type SecurityContext = {
    isInitialised: boolean;
    isAuthenticated: () => boolean;
    loggedInUser: User | undefined;
    login: () => void;
    logout: () => void;
}

export default createContext<SecurityContext>({
    isInitialised: false,
    isAuthenticated: () => false,
    loggedInUser: undefined,
    login: () => {
    },
    logout: () => {
    }
})