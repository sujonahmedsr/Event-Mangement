import { z } from "zod";

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email format'),
        password: z.string(),
    }),
});