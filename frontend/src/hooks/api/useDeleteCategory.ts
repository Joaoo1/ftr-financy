import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { DELETE_CATEGORY } from "../../lib/graphql/mutations/DeleteCategory";

type UseDeleteCategoryOptions = Omit<
  UseMutationOptions<boolean, Error, string>,
  "mutationFn"
>;

export function useDeleteCategory(options?: UseDeleteCategoryOptions) {
  async function handler(id: string): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate<{ deleteCategory: boolean }>({
        mutation: DELETE_CATEGORY,
        variables: { id },
      });

      if (!data?.deleteCategory) throw new Error("Erro ao deletar categoria");

      return data.deleteCategory;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao deletar categoria");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
