import z from "zod";

export const sendMessageSchema = z.object({
    id: z.string(),
    text: z.string().min(1, "Message cannot be empty").max(500, "Message cannot have more than 500 characters"),
})