import axios from "axios";
import {
    InLobby,
    JoinMultiPlayerResponse,
    LobbiesResponse,
    MultiplayerLobbyInfo,
    StartMultiPlayerRequest,
    StartMultiPlayerResponse
} from "@/model/lobby.ts";

export async function startSinglePlayer(gameId: string) {
    const {data: launchUrl} = await axios.post("/api/lobbies/singleplayer/start", {
        gameId,
    });
    return launchUrl;
}

export async function startMultiPlayer(lobbyId: string) {
    const {data: launchUrl} = await axios.post("/api/lobbies/multiplayer/start", {
        lobbyId,
    });
    return launchUrl;
}


export async function startMultiplayerLobby(request: StartMultiPlayerRequest): Promise<StartMultiPlayerResponse> {
    const {data} = await axios.post("/api/lobbies/multiplayer/prepare", request);
    return data;
}

export async function joinMultiplayerLobby(lobbyId: string): Promise<JoinMultiPlayerResponse> {
    const {data} = await axios.patch(`/api/lobbies/multiplayer/${lobbyId}/join`);
    return data;
}

export async function getAllLobbies(gameId: string): Promise<LobbiesResponse> {
    const {data} = await axios.get(`/api/lobbies/multiplayer/${gameId}/lobbies`);
    return data;
}

export async function getLobbyInfo(lobbyId: string): Promise<MultiplayerLobbyInfo> {
    const {data} = await axios.get(`/api/lobbies/multiplayer/${lobbyId}/info`);
    return data;
}

export async function isPlayerInLobby(): Promise<InLobby> {
    const {data: isInLobby} = await axios.get(`/api/lobbies/player/in-lobby`);
    return isInLobby;
}

export async function leaveLobby(): Promise<void> {
    await axios.patch("/api/lobbies")
}

export async function getMySession(lobbyId: string) {
    const {data} = await axios.get(`/api/lobbies/multiplayer/${lobbyId}/session`);
    return data;
}
