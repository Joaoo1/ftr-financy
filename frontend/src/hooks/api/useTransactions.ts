import { useQuery } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { LIST_TRANSACTIONS } from "../../lib/graphql/queries/list-transactions";
import { type Transaction, type TransactionType } from "../../types";

type TransactionsOutput = {
  items: Transaction[];
  total: number;
};

type TransactionFilter = {
  type?: TransactionType;
  categoryId?: string;
  month?: number;
  year?: number;
  description?: string;
};

type UseTransactionsParams = {
  page?: number;
  limit?: number;
  filter?: TransactionFilter;
};

export function useTransactions(params: UseTransactionsParams = {}) {
  const { page = 1, limit = 10, filter } = params;

  return useQuery({
    queryKey: ["transactions", page, limit, filter],
    queryFn: async () => {
      const { data } = await apolloClient.query<{
        transactions: TransactionsOutput;
      }>({
        query: LIST_TRANSACTIONS,
        variables: { page, limit, filter },
        fetchPolicy: "network-only",
      });

      if (!data?.transactions) {
        throw new Error("Erro ao carregar transações");
      }

      return data.transactions;
    },
  });
}
