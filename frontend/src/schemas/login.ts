import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ error: "E-mail é obrigatório" }).email("E-mail inválido"),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(1, "Senha é obrigatória"),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
