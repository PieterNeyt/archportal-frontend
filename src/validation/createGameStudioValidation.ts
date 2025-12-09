import z from "zod"

export const gameStudioSchema = z.object({
    name: z.string().max(255),
    description: z.string().max(255),
    IBAN: z.string().max(255)
})

export type GameStudioValues = z.infer<typeof gameStudioSchema>;