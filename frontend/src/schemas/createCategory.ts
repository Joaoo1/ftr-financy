import { z } from "zod";

export const createCategorySchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(2, "Título deve ter no mínimo 2 caracteres")
    .max(50, "Título não pode ter mais de 50 caracteres"),
  description: z
    .string()
    .max(200, "Descrição não pode ter mais de 200 caracteres")
    .optional(),
  icon: z.string().min(1, "Ícone é obrigatório"),
  color: z
    .string()
    .regex(
      /^#[0-9A-F]{6}$/i,
      "Cor deve ser um código hexadecimal válido (ex: #FF5733)",
    ),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
