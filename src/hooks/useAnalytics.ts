import {useQuery} from "@tanstack/react-query";
import {getGameStatistics, getPlayerStatistics} from "@/service/analyticsService.ts";
import {GameStatistics} from "@/model/gameStatistics.ts";

const GAME_STATISTICS_KEY = "game statistics";

export function useGameStatistics(gameId: string) {
    const queryKey = [GAME_STATISTICS_KEY, gameId];

    const {
        isLoading,
        isError,
        refetch,
        data: gameStatistics,
        isSuccess,
        error
    } = useQuery<GameStatistics, Error>({
        enabled: !!gameId,

        queryKey: queryKey,

        queryFn: () => getGameStatistics(gameId)
    });

    return {
        isLoading,
        isError,
        refetch,
        gameStatistics,
        isSuccess,
        error
    };
}

    export function usePlayerStats(profileId: string) {
        const {
            isLoading, isError, refetch, data: PlayerStats,
        } = useQuery({
            queryKey: ["PlayerStats", profileId],
            queryFn: () => getPlayerStatistics(profileId)
        });

        return {isLoading, isError, refetch, PlayerStats,};
    }