import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateGameStudio} from "@/model/createGameStudio.ts";
import {AddGameStudio} from "@/service/gameStudioService.ts";


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
