import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    getAllLobbies,
    getLobbyInfo, getMySession, isPlayerInLobby,
    joinMultiplayerLobby, startMultiPlayer,
    startMultiplayerLobby,
    startSinglePlayer
} from "../service/lobbyService";
import {inLobby, LobbiesResponse, MultiplayerLobbyInfo, StartMultiPlayerRequest} from "@/model/lobby.ts";


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

export function useStartMultiplayerGame() {
    const queryClient = useQueryClient()
    const {
        mutateAsync,
        isPending,
        isError,

    } = useMutation(
        {
            mutationFn: (lobbyId: string) => {
                return startMultiPlayer(lobbyId)
            },
            onSuccess: () => queryClient.invalidateQueries({queryKey: ['session']}),
        })

    return {
        isPending,
        isError,
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
            queryClient.invalidateQueries({queryKey: ['lobbies']});
            queryClient.invalidateQueries({queryKey: ['session']});
            queryClient.invalidateQueries({queryKey: ['PlayerInLobby']});
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
            queryClient.invalidateQueries({queryKey: ['lobbyInfo', lobbyId]});
            queryClient.invalidateQueries({queryKey: ['session']});
            queryClient.invalidateQueries({queryKey: ['PlayerInLobby']});
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
        queryKey: ['lobbies', gameId],
        queryFn: () => getAllLobbies(gameId),
        enabled: !!gameId,
    });

    return {lobbies, isLoading, isError, refetch};
}

export function useGetLobbyInfo(lobbyId: string) {
    const {data: lobby, isLoading, isError, refetch} = useQuery<MultiplayerLobbyInfo, Error>({
        queryKey: ['lobbyInfo', lobbyId],
        queryFn: () => getLobbyInfo(lobbyId),
        enabled: !!lobbyId,
        refetchInterval: 1500, // every 1.5 sec
        refetchOnWindowFocus: true,
    });

    return {lobby, isLoading, isError, refetch};
}

export function useIsPLayerInLobby() {
    const {data: isInLobby, isLoading, isError, refetch} = useQuery<inLobby>({
        queryKey: ['PlayerInLobby'],
        queryFn: () => isPlayerInLobby(),
    });

    return {isInLobby, isLoading, isError, refetch};
}

export function useGetMySession(lobbyId: string) {
    const { data: mySession, isLoading, isError, refetch } = useQuery({
        queryKey: ['mySession', lobbyId],
        queryFn: () => getMySession(lobbyId),
        enabled: !!lobbyId,
        refetchOnWindowFocus: true, // Optioneel, afhankelijk van gewenst gedrag
    });

    return { mySession, isLoading, isError, refetch };
}

