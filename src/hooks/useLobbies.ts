import { useMutation } from "@tanstack/react-query";
import { startSinglePlayer } from "../service/lobbyService";



export function useStartSinglePlayerGame() {
    return useMutation({
        mutationFn: ({ gameId }: { gameId: string; }) =>
            startSinglePlayer(gameId)
    });
}
