import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { DELETE_TRANSACTION } from "../../lib/graphql/mutations/DeleteTransaction";

type UseDeleteTransactionOptions = Omit<
  UseMutationOptions<boolean, Error, string>,
  "mutationFn"
>;

export function useDeleteTransaction(options?: UseDeleteTransactionOptions) {
  async function handler(id: string): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<{
        deleteTransaction: boolean;
      }>({
        mutation: DELETE_TRANSACTION,
        variables: { id },
      });

      if (!data?.deleteTransaction)
        throw new Error("Erro ao deletar transação");

      return data.deleteTransaction;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao deletar transação");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
