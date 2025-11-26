import axios from "axios";

export async function startSinglePlayer(gameId: string) {
    const { data } = await axios.post("/api/lobbies/singleplayer/start", {
        gameId,
        playerId: "550e8400-e29b-41d4-a716-446655440000"
    });
    return data;
}
