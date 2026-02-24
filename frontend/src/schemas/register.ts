import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string({ error: "E-mail é obrigatório" }).email("E-mail inválido"),
  password: z
    .string({ error: "Senha é obrigatória" })
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
