import {PropsWithChildren, useContext, useEffect} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useNavigate} from "react-router-dom";

export default function RouteGuardGameStudio({children}: PropsWithChildren) {
    const {isInitialised, isAuthenticated, loggedInUser, login} = useContext(SecurityContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialised && !isAuthenticated()) {
            login();
        }
    }, [isAuthenticated, isInitialised, loggedInUser?.hasStudio, login]);

    useEffect(() => {
        if (loggedInUser?.hasStudio) {
            if (window.location.pathname !== "/shop" && window.location.hash !== "#studio")
                navigate("/shop#studio");
        }
    }, [loggedInUser?.hasStudio, navigate]);

    if (!isInitialised || !isAuthenticated()) {
        return <div>Authenticating</div>;
    }

    return children;
}