import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string({ error: "Nome é obrigatório" })
    .min(2, "Nome deve ter no mínimo 2 caracteres"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
