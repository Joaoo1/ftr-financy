import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { apolloClient } from "../../lib/graphql/apollo";
import { LOGIN } from "../../lib/graphql/mutations/Login";

export type LoginInput = {
  email: string;
  password: string;
};

type LoginOutput = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
};

type UseLoginOptions = Omit<
  UseMutationOptions<LoginOutput, Error, LoginInput>,
  "mutationFn"
>;

export function useLogin(options?: UseLoginOptions) {
  async function handler(input: LoginInput): Promise<LoginOutput> {
    try {
      const { data } = await apolloClient.mutate<{ login: LoginOutput }>({
        mutation: LOGIN,
        variables: { input },
      });

      if (!data?.login) {
        throw new Error("Erro ao realizar login");
      }

      return data.login;
    } catch (err) {
      const error = err as Error;
      const message = error.message || "Erro ao realizar login";
      throw new Error(message);
    }
  }

  return useMutation({ mutationFn: handler, ...options });
}
