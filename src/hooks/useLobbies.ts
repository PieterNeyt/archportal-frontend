import {useMutation, useQueryClient} from "@tanstack/react-query";
import {startSinglePlayer} from "../service/lobbyService";


export function useStartSinglePlayerGame() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (gameId: string) => {
                return startSinglePlayer(gameId)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['session']}),
        })

    return {
        isPending,
        isError,
        startSinglePlayer: mutateAsync
    }
}
