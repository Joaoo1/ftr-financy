import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { CREATE_CATEGORY } from "../../lib/graphql/mutations/CreateCategory";
import { type Category } from "../../types";
import type { CreateCategoryInput } from "../../schemas/createCategory";

type UseCreateCategoryOptions = Omit<
  UseMutationOptions<Category, Error, CreateCategoryInput>,
  "mutationFn"
>;

export function useCreateCategory(options?: UseCreateCategoryOptions) {
  async function handler(data: CreateCategoryInput): Promise<Category> {
    try {
      const { data: result } = await apolloClient.mutate<{
        createCategory: Category;
      }>({
        mutation: CREATE_CATEGORY,
        variables: { data },
      });

      if (!result?.createCategory) throw new Error("Erro ao criar categoria");

      return result.createCategory;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao criar categoria");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
