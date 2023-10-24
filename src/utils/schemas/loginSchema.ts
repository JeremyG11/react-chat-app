import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(10, "Password must atleast 10 characters"),
  checkbox: z.boolean(),
});

export type ZodLoginSchema = z.infer<typeof loginSchema>;
