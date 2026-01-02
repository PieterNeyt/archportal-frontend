import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Achievement} from "@/model/game.ts";
import {addAchievement} from "@/service/gameService.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import {getAchievemnts, getAchievemntsFromProfile} from "@/service/analyticsService.ts";

const GAME_KEY = "game";

export function useAddAchievement(gameId: string) {
    const queryClient = useQueryClient();

    const { mutateAsync: AddAchievement, isPending, isError, error,isSuccess } = useMutation({
        mutationFn: (achievement: Achievement) => {
            return addAchievement(gameId, achievement);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GAME_KEY] });
        }
    });

    return {
        AddAchievement,
        isPending,
        isError,
        error,
        isSuccess
    };
}


export function useAchievemnts(gameId: string) {
    const {isAuthenticated, isInitialised} = useContext(SecurityContext);

    const {isLoading, isError, data: achievements} = useQuery({
        queryKey: ["achievemnts", gameId],
        queryFn: () => getAchievemnts(gameId),
        enabled: isAuthenticated() && isInitialised
    });
    return {isLoading, isError, achievements};
}

export function useProfileAchievements(profileId: string) {
    const {isLoading, isError, data: achievements} = useQuery({
        queryKey: ["achievemnts", profileId],
        queryFn: () => getAchievemntsFromProfile(profileId),
    });
    return {isLoading, isError, achievements};
}