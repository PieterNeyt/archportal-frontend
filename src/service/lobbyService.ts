import axios from "axios";
import {
    JoinMultiPlayerResponse,
    LobbiesResponse, MultiplayerLobbyInfo,
    StartMultiPlayerRequest,
    StartMultiPlayerResponse
} from "@/model/lobby.ts";

export async function startSinglePlayer(gameId: string) {
    const { data :launchUrl } = await axios.post("/api/lobbies/singleplayer/start", {
        gameId,
    });
    return launchUrl;
}

export async function startMultiplayerLobby(request: StartMultiPlayerRequest): Promise<StartMultiPlayerResponse> {
    const { data } = await axios.post("/api/lobbies/multiplayer/prepare", request);
    return data;
}

export async function joinMultiplayerLobby(lobbyId: string): Promise<JoinMultiPlayerResponse> {
    const { data } = await axios.patch(`/api/lobbies/multiplayer/${lobbyId}/join`);
    return data;
}

export async function getAllLobbies(gameId: string): Promise<LobbiesResponse> {
    const { data } = await axios.get(`/api/lobbies/multiplayer/${gameId}/lobbies`);
    return data;
}

export async function getLobbyInfo(lobbyId: string): Promise<MultiplayerLobbyInfo> {
    const { data } = await axios.get(`/api/lobbies/multiplayer/${lobbyId}/info`);
    return data;
}
