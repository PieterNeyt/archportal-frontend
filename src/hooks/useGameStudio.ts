import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGameStudio, getMyStudioStatus} from "@/service/gameStudioService.ts";
import {CreateGameStudio} from "@/model/GameStudio.ts";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";


export function useAddGameStudio() {
    const {updateGameStudioStatus} = useContext(SecurityContext);

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
            onSuccess: (createdGame) => {
                updateGameStudioStatus(createdGame);
                queryClient.invalidateQueries({queryKey: ['GameStudio']});
            },
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
