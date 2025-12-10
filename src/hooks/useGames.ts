import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGame, getGame, getGames, getGamesFromStudio, updateGame} from "@/service/gameService.ts";
import {CreateGame} from "@/model/createGame.ts";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";
import {Game} from "@/model/game.ts";

export function useGames() {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["games"],
        queryFn: () => getGames()
    });

    return {isLoading, isError, refetch, games};
}

export function useGameFromStudio() {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["gamesStudio"],
        queryFn: () => getGamesFromStudio()
    });

    return {isLoading, isError, refetch, games};
}

export function useGame(id: string) {
    const {isLoading, isError, refetch, data: game} = useQuery({
        queryKey: ["game"],
        queryFn: () => getGame(id)
    });

    return {isLoading, isError, refetch, game};
}

export function useUpdateGame() {
    const queryClient = useQueryClient()

    const {mutateAsync: UpdateGame, isError, isPending} = useMutation({
        mutationFn: (game: Game) => {
            return updateGame(game)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['game']});
        }
    })

    return {isPending, isError, UpdateGame}
}


export function useAddGame() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (newGame: CreateGame) => {
                return AddGame(newGame)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['games']}),
            onError: (error) => {
                let errorMessage = "Failed to add to cart";

                if (error instanceof AxiosError && error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                addToast({
                    title: "Failed to create game",
                    description: errorMessage,
                    color: "danger",
                })
            }
        })

    return {
        isPending,
        isError,
        AddGame: mutateAsync
    }
}