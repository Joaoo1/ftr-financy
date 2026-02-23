import { HelloResolver } from "./hello-resolver";
import { AuthResolver } from "./auth-resolver";

export const resolvers = [HelloResolver, AuthResolver] as const;
