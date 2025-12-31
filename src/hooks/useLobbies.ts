import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getAllLobbies,
    getLobbyInfo,
    getMySession,
    isPlayerInLobby,
    joinMultiplayerLobby,
    leaveLobby,
    startMultiPlayer,
    startMultiplayerLobby,
    startSinglePlayer
} from "../service/lobbyService";
import {InLobby, LobbiesResponse, MultiplayerLobbyInfo, StartMultiPlayerRequest} from "@/model/lobby.ts";

const SESSION_KEY = "session";
const LOBBIES_KEY = "lobbies";
const PLAYER_IN_LOBBY_KEY = "player in lobby";
const LOBBY_INFO_KEY = "lobby info";
const MY_SESSION_KEY = "my session";

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
            onSuccess: () => queryClient.invalidateQueries({queryKey: [SESSION_KEY]}),
        })

    return {
        isPending,
        isError,
        startSinglePlayer: mutateAsync
    }
}

export function useStartMultiplayerGame() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,
        error,
        isSuccess,

    } = useMutation(
        {
            mutationFn: (lobbyId: string) => {
                return startMultiPlayer(lobbyId)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: [SESSION_KEY]});
            },
        })

    return {
        isPending,
        isError,
        error,
        isSuccess,
        startMultiplayer: mutateAsync
    }
}


export function useStartMultiplayerLobby() {
    const queryClient = useQueryClient();

    const {
        mutateAsync,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (request: StartMultiPlayerRequest) => {
            return startMultiplayerLobby(request);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [LOBBIES_KEY]});
            queryClient.invalidateQueries({queryKey: [SESSION_KEY]});
            queryClient.invalidateQueries({queryKey: [PLAYER_IN_LOBBY_KEY]});
        },
    });

    return {
        isPending,
        isError,
        startLobby: mutateAsync
    };
}

export function useJoinMultiplayerLobby() {
    const queryClient = useQueryClient();

    const {
        mutateAsync,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (lobbyId: string) => {
            return joinMultiplayerLobby(lobbyId);
        },
        onSuccess: (_data, lobbyId) => {
            queryClient.invalidateQueries({queryKey: [LOBBY_INFO_KEY, lobbyId]});
            queryClient.invalidateQueries({queryKey: [SESSION_KEY]});
            queryClient.invalidateQueries({queryKey: [PLAYER_IN_LOBBY_KEY]});
        },
    });

    return {
        isPending,
        isError,
        joinLobby: mutateAsync
    };
}

export function useGetAllLobbies(gameId: string) {
    const {data: lobbies, isLoading, isError, refetch} = useQuery<LobbiesResponse, Error>({
        queryKey: [LOBBIES_KEY, gameId],
        queryFn: () => getAllLobbies(gameId),
        enabled: !!gameId,
    });

    return {lobbies, isLoading, isError, refetch};
}

export function useGetLobbyInfo(lobbyId: string) {
    const {data: lobby, isLoading, isError, refetch} = useQuery<MultiplayerLobbyInfo, Error>({
        queryKey: [LOBBY_INFO_KEY, lobbyId],
        queryFn: () => getLobbyInfo(lobbyId),
        enabled: !!lobbyId,
        refetchInterval: 1500, // every 1.5 sec
        refetchOnWindowFocus: true,
    });

    return {lobby, isLoading, isError, refetch};
}

export function useIsPLayerInLobby() {
    const {data: isInLobby, isLoading, isError, refetch} = useQuery<InLobby>({
        queryKey: [PLAYER_IN_LOBBY_KEY],
        queryFn: () => isPlayerInLobby(),
    });

    return {isInLobby, isLoading, isError, refetch};
}

export function useGetMySession(lobbyId: string) {
    const {data: mySession, isLoading, isError, refetch} = useQuery({
        queryKey: [MY_SESSION_KEY, lobbyId],
        queryFn: () => getMySession(lobbyId),
        enabled: !!lobbyId,
        refetchOnWindowFocus: true,
    });

    return {mySession, isLoading, isError, refetch};
}

export function useLeaveLobby() {
    const queryClient = useQueryClient();
    const {mutateAsync, isPending, isSuccess, isError, error} = useMutation({
        mutationFn: () => {
            return leaveLobby()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [LOBBIES_KEY]});
            queryClient.invalidateQueries({queryKey: [PLAYER_IN_LOBBY_KEY]});
        }
    })

    return {isPending, isSuccess, isError, leaveLobby: mutateAsync, error}
}