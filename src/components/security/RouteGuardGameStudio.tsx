import {PropsWithChildren, useContext, useEffect} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {useNavigate} from "react-router-dom";
import RouteGuardLoggedIn from "@/components/security/RouteGuardLoggedIn.tsx";

export default function RouteGuardGameStudio({children}: PropsWithChildren) {
    const {loggedInUser} = useContext(SecurityContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedInUser?.hasStudio) {
            if (window.location.pathname !== "/gamestudio") {
                navigate("/gamestudio");
            }
        } else {
            if (window.location.pathname !== "/create/gamestudio")
                navigate("/create/gamestudio")
        }
    }, [loggedInUser?.hasStudio, navigate]);

    return (
        <RouteGuardLoggedIn>
            {children}
        </RouteGuardLoggedIn>
    );
}