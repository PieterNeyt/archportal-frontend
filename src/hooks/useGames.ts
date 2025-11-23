import {useQuery} from "@tanstack/react-query";
import {getGames} from "@/service/gameService.ts";

export function useGames() {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["games"],
        queryFn: () => getGames()
    });

    return {isLoading, isError, refetch, games};
}