import z from "zod"
import {GameGenre} from "@/model/GameGenre.ts";

export const createGameSchema = z.object({
    title: z.string().max(255),
    description: z.string().max(255),
    price: z.number().positive(),
    imageUrl: z.string().max(255),
    gameUrl: z.string().min(5).max(255),
    genre: z.enum(GameGenre),
    maxlobbysize:z.number().positive().min(1),
})

export type CreateGameValues = z.infer<typeof createGameSchema>;