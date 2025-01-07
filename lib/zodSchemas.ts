import { z } from "zod"

export const loginSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(25),
})