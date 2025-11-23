import {User} from "@/model/user.ts";
import {createContext} from "react";

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