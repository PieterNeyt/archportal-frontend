import {useQuery} from "@tanstack/react-query";
import {getGameStatistics} from "@/service/analyticsService.ts"; // Pas het pad aan indien nodig
import {GameStatistics} from "@/model/gameStatistics.ts";

const GAME_STATISTICS_KEY = "game statistics";

export function useGameStatistics(gameId: string) {
    const queryKey = [GAME_STATISTICS_KEY, gameId];

    const {
        isLoading,
        isError,
        refetch,
        data: gameStatistics,
        isFetching,
        error
    } = useQuery<GameStatistics, Error>({
        // De query is alleen actief als beide ID's aanwezig zijn (niet null of undefined)
        enabled: !!gameId,

        queryKey: queryKey,

        queryFn: () => getGameStatistics(gameId)
    });

    return {
        isLoading,
        isError,
        refetch,
        gameStatistics,
        isFetching,
        error
    };
}