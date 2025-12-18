import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getLibrary, addGameToFavorite, removeGameFromFavorite} from "@/service/libraryService";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

const LIBRARY_KEY = "library";

export function useLibrary() {
    const {isAuthenticated} = useContext(SecurityContext)

    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: [LIBRARY_KEY],
        queryFn: () => getLibrary(),
        enabled: isAuthenticated(),
    });

    return {isLoading, isError, refetch, games};
}

export function useAddToFavorites() {
    const queryClient = useQueryClient();

    const {mutateAsync: addToFavorites, isError, isPending} = useMutation({
        mutationFn: (gameId: string) => {
            return addGameToFavorite(gameId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [LIBRARY_KEY]});
        }
    });

    return {isPending, isError, addToFavorites};
}

export function useRemoveFromFavorites() {
    const queryClient = useQueryClient();

    const {mutateAsync: removeFromFavorites, isError, isPending} = useMutation({
        mutationFn: (gameId: string) => {
            return removeGameFromFavorite(gameId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [LIBRARY_KEY]});
        }
    });

    return {isPending, isError, removeFromFavorites};
}