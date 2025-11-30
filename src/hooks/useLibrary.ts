import {useQuery} from "@tanstack/react-query";
import {getLibrary} from "@/service/libraryService";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

export function useLibrary() {
    const {isAuthenticated} = useContext(SecurityContext)

    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["library"],
        queryFn: () => getLibrary(),
        enabled: isAuthenticated(),
    });

    return {isLoading, isError, refetch, games};
}