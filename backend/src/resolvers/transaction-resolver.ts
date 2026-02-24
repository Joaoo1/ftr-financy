import { Args, Arg, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";
import { TransactionService } from "../services/transaction-service";
import { TransactionModel } from "../models/transaction";
import { CreateTransactionInput } from "../dtos/create-transaction-input";
import { UpdateTransactionInput } from "../dtos/update-transaction-input";
import { TransactionListArgs } from "../dtos/transaction-list-args";
import { TransactionListOutput } from "../dtos/transaction-list-output";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { AppContext } from "../context";

function requireUserId(context: AppContext): string {
  if (!context.userId) throw new UnauthorizedError();
  return context.userId;
}

@Resolver()
export class TransactionResolver {
  private service = new TransactionService();

  @Query(() => TransactionListOutput)
  async transactions(
    @Args(() => TransactionListArgs)
    { page, limit, filter }: TransactionListArgs,
    @Ctx() ctx: AppContext,
  ): Promise<TransactionListOutput> {
    const userId = requireUserId(ctx);
    return this.service.list(userId, page, limit, filter);
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
