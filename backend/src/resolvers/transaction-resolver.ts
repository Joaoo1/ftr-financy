import { Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { TransactionService } from "../services/transaction-service";
import { TransactionModel } from "../models/transaction";
import { CreateTransactionInput } from "../dtos/create-transaction-input";
import { UpdateTransactionInput } from "../dtos/update-transaction-input";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { AppContext } from "../context";

function requireUserId(context: AppContext): string {
  if (!context.userId) throw new UnauthorizedError();
  return context.userId;
}

@Resolver()
export class TransactionResolver {
  private service = new TransactionService();

  @Query(() => [TransactionModel])
  async transactions(@Ctx() ctx: AppContext): Promise<TransactionModel[]> {
    const userId = requireUserId(ctx);
    return this.service.list(userId);
  }

  @Mutation(() => TransactionModel)
  async createTransaction(
    @Arg("data", () => CreateTransactionInput) data: CreateTransactionInput,
    @Ctx() ctx: AppContext,
  ): Promise<TransactionModel> {
    const userId = requireUserId(ctx);
    return this.service.create(userId, data);
  }

  @Mutation(() => TransactionModel)
  async updateTransaction(
    @Arg("data", () => UpdateTransactionInput) data: UpdateTransactionInput,
    @Ctx() ctx: AppContext,
  ): Promise<TransactionModel> {
    const userId = requireUserId(ctx);
    return this.service.update(userId, data);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(
    @Arg("id", () => ID) id: string,
    @Ctx() ctx: AppContext,
  ): Promise<boolean> {
    const userId = requireUserId(ctx);
    return this.service.delete(userId, id);
  }
}
