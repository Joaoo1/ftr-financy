import { Arg, Mutation, Resolver } from "type-graphql";
import { AuthService } from "../services/auth-service";
import { AuthResponse } from "../dtos/auth-response";
import { RegisterInput } from "../dtos/register-input";
import { LoginInput } from "../dtos/login-input";

@Resolver()
export class AuthResolver {
  private authService = new AuthService();

  @Mutation(() => AuthResponse)
  async register(
    @Arg("input", () => RegisterInput) input: RegisterInput,
  ): Promise<AuthResponse> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse)
  async login(
    @Arg("input", () => LoginInput) input: LoginInput,
  ): Promise<AuthResponse> {
    return this.authService.login(input);
  }
}
