import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { REGISTER } from "../../lib/graphql/mutations/Register";

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type RegisterOutput = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
};

type UseRegisterOptions = Omit<
  UseMutationOptions<RegisterOutput, Error, RegisterInput>,
  "mutationFn"
>;

export function useRegister(options?: UseRegisterOptions) {
  async function handler(input: RegisterInput): Promise<RegisterOutput> {
    try {
      const { data } = await apolloClient.mutate<{ register: RegisterOutput }>({
        mutation: REGISTER,
        variables: { input },
      });

      if (!data?.register) {
        throw new Error("Erro ao realizar o cadastro");
      }

      return data.register;
    } catch (err) {
      const error = err as Error;
      const message = error.message || "Erro ao realizar o cadastro";
      throw new Error(message);
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
