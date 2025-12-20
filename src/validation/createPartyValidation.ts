import z from "zod";

export const partySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
    maxMembers: z.number().min(2, "Minimum 2 players required").max(10, "Maximum 10 players allowed"),
})

export type CreatePartyValues = z.infer<typeof partySchema>