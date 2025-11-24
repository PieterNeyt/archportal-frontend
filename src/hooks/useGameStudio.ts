import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGameStudio, getMyStudioStatus} from "@/service/gameStudioService.ts";
import {CreateGameStudio} from "@/model/GameStudio.ts";


export function useAddGameStudio() {
    const queryClient = useQueryClient()
    const {
        mutate,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (newGameStudio: CreateGameStudio) => {
                return AddGameStudio(newGameStudio)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['GameStudio']}),
        })

    return {
        isPending,
        isError,
        AddGameStudio: mutate
    }
}

export function useGameStudioStatus() {
    const {isLoading, isError, refetch, data: gameStudioStatus} = useQuery({
        queryKey: ["gameStudioStatus"],
        queryFn: () => getMyStudioStatus(),
        enabled: false
    })
    return {isLoading, isError, refetch, gameStudioStatus}
}
