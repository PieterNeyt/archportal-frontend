import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AddGame, getGame, getGames, getGamesFromStudio, updateGame} from "@/service/gameService.ts";
import {CreateGame} from "@/model/createGame.ts";
import {Game} from "@/model/game.ts";

const GAMES_KEY = "games";
const GAME_KEY = "game";
const GAMES_FROM_STUDIO_KEY = "games from studio";

export function useGames() {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: [GAMES_KEY],
        queryFn: () => getGames()
    });

    return {isLoading, isError, refetch, games};
}

export function useGameFromStudio() {
    const {isLoading, isError, refetch, data: games} = useQuery({
        queryKey: [GAMES_FROM_STUDIO_KEY],
        queryFn: () => getGamesFromStudio()
    });

    return {isLoading, isError, refetch, games};
}

export function useGame(id: string) {
    const {isLoading, isError, refetch, data: game} = useQuery({
        queryKey: [GAME_KEY],
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
            await queryClient.invalidateQueries({queryKey: [GAME_KEY]});
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
        error
    } = useMutation(
        {
            mutationFn: (newGame: CreateGame) => {
                return AddGame(newGame)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: [GAMES_KEY]})
        })

    return {
        isPending,
        isError,
        error,
        AddGame: mutateAsync
    }
}