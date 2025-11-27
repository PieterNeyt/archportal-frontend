import {PropsWithChildren, useContext, useEffect} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useNavigate} from "react-router-dom";

export default function RouteGuardCreateGame({children}: PropsWithChildren) {
    const {isInitialised, isAuthenticated, loggedInUser, login} = useContext(SecurityContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialised && !isAuthenticated()) {
            login();
        }
    }, [isAuthenticated, isInitialised, loggedInUser?.hasStudio, login]);

    useEffect(() => {
        if (loggedInUser) {
            if (!loggedInUser.hasStudio) {
                if (window.location.pathname !== "/create/gamestudio")
                    navigate("/create/gamestudio")
            } else {
                if (window.location.pathname !== "/create/game")
                    navigate("/create/game");
            }
        }
    }, [loggedInUser, loggedInUser?.hasStudio, navigate]);

    if (!isInitialised || !isAuthenticated()) {
        return <div>Authenticating</div>;
    }

    if (loggedInUser?.hasStudio) {
        return children;
    }
    return null;
}