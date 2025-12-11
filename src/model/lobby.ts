export type GameLobbyFace = {
    id: string;
    maxPlayers: number;
    currentPlayers: number;
    status: string
};

export interface inLobby {
    lobbyId: string | null;
    isPlayerInLobby: number;
}

export type LobbiesResponse = {
    lobbies: GameLobbyFace[];
};

export type StartMultiPlayerRequest = {
    gameId: string;
};

export type StartMultiPlayerResponse = {
    lobbyId: string;
};

export type JoinMultiPlayerResponse = {
    lobbyId: string;
};

export type PlayerInfo = {
    playerId: string;
    username: string;
};

export type MultiplayerLobbyInfo = {
    lobbyId: string;
    players: PlayerInfo[];
    status: string;
    maxPlayers: number;
};