import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { UPDATE_CATEGORY } from "../../lib/graphql/mutations/UpdateCategory";
import { type Category } from "../../types";

export type UpdateCategoryInput = {
  id: string;
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
};

type UseUpdateCategoryOptions = Omit<
  UseMutationOptions<Category, Error, UpdateCategoryInput>,
  "mutationFn"
>;

export function useUpdateCategory(options?: UseUpdateCategoryOptions) {
  async function handler(data: UpdateCategoryInput): Promise<Category> {
    try {
      const { data: result } = await apolloClient.mutate<{
        updateCategory: Category;
      }>({
        mutation: UPDATE_CATEGORY,
        variables: { data },
      });

      if (!result?.updateCategory)
        throw new Error("Erro ao atualizar categoria");

      return result.updateCategory;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao atualizar categoria");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
