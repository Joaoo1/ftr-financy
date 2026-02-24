import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z
    .number({ error: "Valor é obrigatório" })
    .positive("Valor deve ser positivo")
    .min(0.01, "Valor mínimo é R$ 0,01"),
  type: z.enum(["INCOME", "EXPENSE"]),
  date: z
    .string({ error: "Data é obrigatória" })
    .refine((date) => !isNaN(Date.parse(date)), "Data inválida"),
  categoryId: z
    .string({ error: "Categoria é obrigatória" })
    .min(1, "Categoria é obrigatória"),
  description: z
    .string({ error: "Descrição é obrigatória" })
    .min(1, "Descrição é obrigatória")
    .max(500, "Descrição não pode ter mais de 500 caracteres"),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
