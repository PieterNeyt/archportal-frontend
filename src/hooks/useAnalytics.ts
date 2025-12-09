import { useQuery } from "@tanstack/react-query";
import { getGameStatistics } from "@/service/analyticsService.ts"; // Pas het pad aan indien nodig
import { GameStatistics } from "@/model/GameStatistics";

/**
 * Haalt de Game Statistics op voor een specifiek profiel en spel met behulp van React Query.
 * * @param profileId De ID van het profiel (string).
 * @param gameId De ID van het spel (string).
 * @param profileId De ID van het profiel.
 * @returns Een object met de query-status en de GameStatistics data.
 */
export function useGameStatistics(gameId: string) {
    const queryKey = ["gameStatistics", gameId];

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