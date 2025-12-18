import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Achievement} from "@/model/game.ts";
import {addAchievement} from "@/service/gameService.ts";

const GAME_KEY = "game";

export function useAddAchievement(gameId: string) {
    const queryClient = useQueryClient();

    const { mutateAsync: AddAchievement, isPending, isError, error,isSuccess } = useMutation({
        mutationFn: (achievement: Achievement) => {
            return addAchievement(gameId, achievement);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [GAME_KEY, gameId] });
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