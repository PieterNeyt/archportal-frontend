import z from "zod"
import {GameGenre} from "@/model/GameGenre.ts";

export const createGameSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().positive(),
    imageUrl: z.string(),
    gameUrl: z.string(),
    genre: z.enum(GameGenre)
})

export type CreateGameValues = z.infer<typeof createGameSchema>;