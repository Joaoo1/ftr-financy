import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { UserService } from "../services/user-service";
import { UserModel } from "../models/user";
import { UpdateUserInput } from "../dtos/update-user-input";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { AppContext } from "../context";

@Resolver()
export class UserResolver {
  private service = new UserService();

  @Mutation(() => UserModel)
  async updateUser(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @Ctx() ctx: AppContext,
  ): Promise<UserModel> {
    if (!ctx.userId) throw new UnauthorizedError();
    return this.service.updateUser(ctx.userId, data.name);
  }
}
