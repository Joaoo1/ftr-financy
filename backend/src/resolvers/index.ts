import { HelloResolver } from "./hello-resolver";
import { AuthResolver } from "./auth-resolver";
import { CategoryResolver } from "./category-resolver";
import { TransactionResolver } from "./transaction-resolver";

export const resolvers = [
  HelloResolver,
  AuthResolver,
  CategoryResolver,
  TransactionResolver,
] as const;
