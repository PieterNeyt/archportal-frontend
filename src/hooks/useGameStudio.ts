import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGameStudio, getGameStudio, getMyStudioStatus, updateGameStudio} from "@/service/gameStudioService.ts";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";
import {CreateGameStudio, GameStudio} from "@/model/GameStudio.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import securityContext from "@/context/SecurityContext.ts";

export const GAME_STUDIO_KEY = "game studio";
const GAME_STUDIO_STATUS_KEY = "game studio status";

export function useAddGameStudio() {
    const {updateGameStudioStatus} = useContext(SecurityContext);

    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (newGameStudio: CreateGameStudio) => {
                return AddGameStudio(newGameStudio)
            },
            onSuccess: (createdGame) => {
                updateGameStudioStatus(createdGame);
                queryClient.invalidateQueries({queryKey: [GAME_STUDIO_KEY]});
            },
            onError: (error) => {
                let errorMessage = "Failed to add to cart";

                if (error instanceof AxiosError && error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                addToast({
                    title: "Failed to create Game Studio",
                    description: errorMessage,
                    color: "danger",
                })
            }
        })

    return {
        isPending,
        isError,
        AddGameStudio: mutateAsync
    }
}

export function useGameStudioStatus() {
    const {isLoading, isError, refetch, data: gameStudioStatus} = useQuery({
        queryKey: [GAME_STUDIO_STATUS_KEY],
        queryFn: () => getMyStudioStatus(),
        enabled: false
    })
    return {isLoading, isError, refetch, gameStudioStatus}
}

export function useGameStudio() {
    const {isAuthenticated, isInitialised} = useContext(securityContext)

    const {isLoading, isError, refetch, data: gameStudio} = useQuery({
        queryKey: [GAME_STUDIO_KEY],
        queryFn: () => getGameStudio(),
        enabled: isAuthenticated() && isInitialised
    })
    return {isLoading, isError, refetch, gameStudio}
}

export function useUpdateGameStudio() {
    const queryClient = useQueryClient()

    const {mutateAsync: UpdateGameStudio, isError, isPending} = useMutation({
        mutationFn: (gameStudio: GameStudio) => {
            return updateGameStudio(gameStudio)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [GAME_STUDIO_KEY]});
        }
    })

    return {isPending, isError, UpdateGameStudio}
}

