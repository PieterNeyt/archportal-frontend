import z from "zod"

export const createGameStudioSchema = z.object({
    name: z.string().max(255),
    description: z.string().max(255),
    IBAN: z.string().max(255),
    ownerFirstName: z.string().max(255),
    ownerLastName: z.string().max(255),
    ownerEmail: z.string().max(255),
})

export type CreateGameStudioValues = z.infer<typeof createGameStudioSchema>;