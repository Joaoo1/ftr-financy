import { useQuery } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { DASHBOARD } from "../../lib/graphql/queries/dashboard";
import { type Category, type Transaction, TransactionType } from "../../types";

type DashboardData = {
  categories: { items: Category[]; total: number };
  transactions: { items: Transaction[]; total: number };
};

type DashboardSummary = {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
};

function computeSummary(transactions: Transaction[]): DashboardSummary {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions.reduce<DashboardSummary>(
    (acc, { amount, type, date }) => {
      const isIncome = type === TransactionType.INCOME;

      acc.totalBalance += isIncome ? amount : -amount;

      const txDate = new Date(date);
      if (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      ) {
        if (isIncome) {
          acc.monthlyIncome += amount;
        } else {
          acc.monthlyExpense += amount;
        }
      }

      return acc;
    },
    { totalBalance: 0, monthlyIncome: 0, monthlyExpense: 0 },
  );
}

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data } = await apolloClient.query<DashboardData>({
        query: DASHBOARD,
        fetchPolicy: "network-only",
      });

      if (!data) {
        throw new Error("Erro ao carregar dados do dashboard");
      }

      const summary = computeSummary(data.transactions.items);

      const categories = data.categories.items.slice(0, 5);
      const transactions = data.transactions.items.slice(0, 5);

      return {
        categories: { items: categories, total: data.categories.total },
        transactions: { items: transactions, total: data.transactions.total },
        ...summary,
      };
    },
  });
}
