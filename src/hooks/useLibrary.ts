import {useQuery} from "@tanstack/react-query";
import {getLibrary} from "@/service/libraryService";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

const LIBRARY_KEY = "library";

export function useLibrary() {
    const {isAuthenticated} = useContext(SecurityContext)

    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: [LIBRARY_KEY],
        queryFn: () => getLibrary(),
        enabled: isAuthenticated(),
    });

    return {isLoading, isError, refetch, games};
}