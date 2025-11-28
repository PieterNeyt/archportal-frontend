import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGame, getGames} from "@/service/gameService.ts";
import {CreateGame} from "@/model/createGame.ts";
import {addToast} from "@heroui/toast";

export function useGame() {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: ["games"],
        queryFn: () => getGames()
    });

    return {isLoading, isError, refetch, games};
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
            onError: () => addToast({
                title: "Failed to create game",
                description: "Something went wrong. Try again or contact support.",
                color: "warning",
            })
        })

    return {
        isPending,
        isError,
        AddGame: mutateAsync
    }
}