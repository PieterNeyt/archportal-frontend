import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateGameStudio} from "@/model/createGameStudio.ts";
import {AddGameStudio} from "@/service/gameStudioService.ts";
import {addToast} from "@heroui/toast";
import {AxiosError} from "axios";


export function useAddGameStudio() {
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
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['GameStudio']}),
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
