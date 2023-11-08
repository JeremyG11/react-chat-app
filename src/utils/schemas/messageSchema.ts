import { z } from "zod";

export const messageSchema = z.object({
  content: z.string({
    required_error: "ConversationId is required",
  }),
});

export type ZodMessageSchema = z.infer<typeof messageSchema>;
