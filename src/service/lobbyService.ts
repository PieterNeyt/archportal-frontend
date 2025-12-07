import axios from "axios";

export async function startSinglePlayer(gameId: string) {
    const { data :launchUrl } = await axios.post("/api/lobbies/singleplayer/start", {
        gameId,
    });
    return launchUrl;
}
