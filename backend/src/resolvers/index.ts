import { HelloResolver } from "./hello-resolver";
import { AuthResolver } from "./auth-resolver";
import { CategoryResolver } from "./category-resolver";
import { TransactionResolver } from "./transaction-resolver";
import { UserResolver } from "./user-resolver";

export const resolvers = [
  HelloResolver,
  AuthResolver,
  CategoryResolver,
  TransactionResolver,
  UserResolver,
] as const;
