import {useQuery} from "@tanstack/react-query";
import {getFriends} from "@/service/friendService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

export function useFriends() {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: profiles} = useQuery({
        queryKey: ["profile"],
        queryFn: () => getFriends(),
        enabled: isAuthenticated() && isInitialised,
    });
    return {isLoading, isError, profiles};
}