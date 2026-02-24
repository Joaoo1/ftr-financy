import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { CREATE_TRANSACTION } from "../../lib/graphql/mutations/CreateTransaction";
import { type Transaction } from "../../types";
import type { CreateTransactionInput } from "../../schemas/createTransaction";

type UseCreateTransactionOptions = Omit<
  UseMutationOptions<Transaction, Error, CreateTransactionInput>,
  "mutationFn"
>;

export function useCreateTransaction(options?: UseCreateTransactionOptions) {
  async function handler(data: CreateTransactionInput): Promise<Transaction> {
    try {
      const { data: result } = await apolloClient.mutate<{
        createTransaction: Transaction;
      }>({
        mutation: CREATE_TRANSACTION,
        variables: { data },
      });

      if (!result?.createTransaction)
        throw new Error("Erro ao criar transação");

      return result.createTransaction;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao criar transação");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
