import z from "zod"

const MAX_MESSAGE_LENGTH = 500

export const sendMessageSchema = z.object({
    text: z.string().max(MAX_MESSAGE_LENGTH, `Max length of message is ${MAX_MESSAGE_LENGTH}`),
})

export type SendMessageValues = z.infer<typeof sendMessageSchema>;