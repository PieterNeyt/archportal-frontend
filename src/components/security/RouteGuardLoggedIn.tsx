import {PropsWithChildren, useContext, useEffect} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import Authenticating from "@/components/security/Authenticating.tsx";

export default function RouteGuardLoggedIn({children}: PropsWithChildren) {
    const {isInitialised, isAuthenticated, loggedInUser, login} = useContext(SecurityContext);

    useEffect(() => {
        if (isInitialised && !isAuthenticated()) {
            login();
        }
    }, [isAuthenticated, isInitialised, loggedInUser?.hasStudio, login]);

    if (!isInitialised || !isAuthenticated()) {
        return <Authenticating/>;
    }

    return children;
}