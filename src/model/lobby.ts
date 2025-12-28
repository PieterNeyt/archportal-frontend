export type GameLobbyFace = {
    lobbyId: string;
    maxPlayers: number;
    currentPlayers: number;
    status: string
};

export interface InLobby {
    lobbyId: string | null;
    gameId: string;
    isPlayerInLobby: boolean;
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
    gamerTag: string;
    avatarUrl: string;
};

export type MultiplayerLobbyInfo = {
    lobbyId: string;
    players: PlayerInfo[];
    status: string;
    maxPlayers: number;
};