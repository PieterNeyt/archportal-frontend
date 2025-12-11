import z from "zod";

export const createLobbySchema = (maxPlayers: number) => z.object({
    title: z.string().min(1, "Title is required").max(255),
    lobbysize: z.number()
        .min(1, "Lobby must accept at least 1 players")
        .max(maxPlayers, `Max players cannot exceed game limit of ${maxPlayers}`),
});

export type CreateLobbyValues = z.infer<ReturnType<typeof createLobbySchema>>;