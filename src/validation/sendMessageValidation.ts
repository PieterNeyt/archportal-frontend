import z from "zod"

const MAX_MESSAGE_LENGT = 500

export const sendMessageSchema = z.object({
    text: z.string().max(MAX_MESSAGE_LENGT,`Max length of message is ${MAX_MESSAGE_LENGT}`),
})

export type SendMessageValues = z.infer<typeof sendMessageSchema>;