import z from "zod"

export const createGameStudioSchema = z.object({
    name: z.string(),
    description: z.string(),
    IBAN: z.string(),
    ownerFirstName: z.string(),
    ownerLastName: z.string(),
    ownerEmail: z.string(),
})

export type CreateGameStudioValues = z.infer<typeof createGameStudioSchema>;