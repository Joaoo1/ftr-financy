import { HelloResolver } from "./hello-resolver";
import { AuthResolver } from "./auth-resolver";
import { CategoryResolver } from "./category-resolver";

export const resolvers = [
  HelloResolver,
  AuthResolver,
  CategoryResolver,
] as const;
