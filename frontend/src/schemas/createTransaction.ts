import { z } from "zod";

export const createTransactionSchema = z.object({
  amount: z
    .number()
    .positive("Valor deve ser positivo")
    .min(0.01, "Valor mínimo é R$ 0,01"),
  type: z
    .enum(["INCOME", "EXPENSE"])
    .refine((val) => ["INCOME", "EXPENSE"].includes(val), {
      message: "Tipo deve ser receita ou despesa",
    }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), "Data inválida"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  description: z
    .string({ error: "Descrição é obrigatória" })
    .max(500, "Descrição não pode ter mais de 500 caracteres"),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionInput = z.infer<typeof updateTransactionSchema>;
