import {PropsWithChildren, useContext, useEffect} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useNavigate} from "react-router-dom";
import RouteGuardLoggedIn from "@/components/security/RouteGuardLoggedIn.tsx";

export default function RouteGuardCreateGame({children}: PropsWithChildren) {
    const {loggedInUser} = useContext(SecurityContext);
    const navigate = useNavigate();

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

    if (loggedInUser?.hasStudio) {
        return (
            <RouteGuardLoggedIn>
                {children}
            </RouteGuardLoggedIn>
        );
    }
    return null;
}