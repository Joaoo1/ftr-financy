import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { UPDATE_TRANSACTION } from "../../lib/graphql/mutations/UpdateTransaction";
import { type Transaction } from "../../types";
import type { UpdateTransactionInput } from "../../schemas/createTransaction";

type UpdateTransactionInputWithId = UpdateTransactionInput & { id: string };

type UseUpdateTransactionOptions = Omit<
  UseMutationOptions<Transaction, Error, UpdateTransactionInputWithId>,
  "mutationFn"
>;

export function useUpdateTransaction(options?: UseUpdateTransactionOptions) {
  async function handler(
    data: UpdateTransactionInputWithId,
  ): Promise<Transaction> {
    try {
      const { data: result } = await apolloClient.mutate<{
        updateTransaction: Transaction;
      }>({
        mutation: UPDATE_TRANSACTION,
        variables: { data },
      });

      if (!result?.updateTransaction)
        throw new Error("Erro ao atualizar transação");

      return result.updateTransaction;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao atualizar transação");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
