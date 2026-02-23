import {
  Arg,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { CategoryService } from "../services/category-service";
import { CategoryModel } from "../models/category";
import { CreateCategoryInput } from "../dtos/create-category-input";
import { UpdateCategoryInput } from "../dtos/update-category-input";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { AppContext } from "../context";

function requireUserId(context: AppContext): string {
  if (!context.userId) throw new UnauthorizedError();
  return context.userId;
}

@Resolver()
export class CategoryResolver {
  private service = new CategoryService();

  @Query(() => [CategoryModel])
  async categories(@Ctx() ctx: AppContext): Promise<CategoryModel[]> {
    const userId = requireUserId(ctx);
    return this.service.list(userId);
  }

  @Mutation(() => CategoryModel)
  async createCategory(
    @Arg("data", () => CreateCategoryInput) data: CreateCategoryInput,
    @Ctx() ctx: AppContext,
  ): Promise<CategoryModel> {
    const userId = requireUserId(ctx);
    return this.service.create(userId, data);
  }

  @Mutation(() => CategoryModel)
  async updateCategory(
    @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput,
    @Ctx() ctx: AppContext,
  ): Promise<CategoryModel> {
    const userId = requireUserId(ctx);
    return this.service.update(userId, data);
  }

  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id", () => ID) id: string,
    @Ctx() ctx: AppContext,
  ): Promise<boolean> {
    const userId = requireUserId(ctx);
    return this.service.delete(userId, id);
  }
}
