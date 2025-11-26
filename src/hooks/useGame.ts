import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGame, getGames} from "@/service/gameService.ts";
import {CreateGame} from "@/model/createGame.ts";

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
        mutate,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (newGame: CreateGame) => {
                return AddGame(newGame)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['games']}),
        })

    return {
        isPending,
        isError,
        AddGame: mutate
    }
}