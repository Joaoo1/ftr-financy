import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { UPDATE_USER } from "../../lib/graphql/mutations/UpdateUser";
import type { User } from "../../types";

type UpdateUserInput = { name: string };

type UseUpdateUserOptions = Omit<
  UseMutationOptions<User, Error, UpdateUserInput>,
  "mutationFn"
>;

export function useUpdateUser(options?: UseUpdateUserOptions) {
  async function handler(data: UpdateUserInput): Promise<User> {
    try {
      const { data: result } = await apolloClient.mutate<{
        updateUser: User;
      }>({
        mutation: UPDATE_USER,
        variables: { data },
      });

      if (!result?.updateUser) throw new Error("Erro ao atualizar usuário");

      return result.updateUser;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Erro ao atualizar usuário");
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
