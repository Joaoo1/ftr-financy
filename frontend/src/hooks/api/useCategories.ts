import { useQuery } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { LIST_CATEGORIES } from "../../lib/graphql/queries/list-categories";
import { type Category } from "../../types";

type CategorySortBy = "TITLE" | "TRANSACTIONS_COUNT";

type CategoriesOutput = {
  items: Category[];
  total: number;
};

type UseCategoriesParams = {
  page?: number;
  limit?: number;
  sortBy?: CategorySortBy;
};

export function useCategories(params: UseCategoriesParams = {}) {
  const { page = 1, limit = 10, sortBy = "TITLE" } = params;

  return useQuery({
    queryKey: ["categories", page, limit, sortBy],
    queryFn: async () => {
      const { data } = await apolloClient.query<{
        categories: CategoriesOutput;
      }>({
        query: LIST_CATEGORIES,
        variables: { page, limit, sortBy },
        fetchPolicy: "network-only",
      });

      if (!data?.categories) {
        throw new Error("Erro ao carregar categorias");
      }

      return data.categories;
    },
  });
}
