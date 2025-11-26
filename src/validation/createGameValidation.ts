import z from "zod"
import {GameGenre} from "@/model/GameGenre.ts";

export const createGameSchema = z.object({
    title: z.string().max(255),
    description: z.string().max(255),
    price: z.number().positive(),
    imageUrl: z.string().max(255),
    gameUrl: z.string().max(255),
    genre: z.enum(GameGenre)
})

export type CreateGameValues = z.infer<typeof createGameSchema>;