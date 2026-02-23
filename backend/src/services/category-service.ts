import { CategoryRepository } from "../repositories/category-repository";
import { NotFoundError } from "../errors/not-found-error";
import type { CreateCategoryInput } from "../dtos/create-category-input";
import type { UpdateCategoryInput } from "../dtos/update-category-input";

export class CategoryService {
  private repo = new CategoryRepository();

  async create(userId: string, input: CreateCategoryInput) {
    return this.repo.create(userId, input);
  }

  async list(userId: string) {
    return this.repo.list(userId);
  }

  async update(userId: string, input: UpdateCategoryInput) {
    const { id, ...data } = input;

    const existing = await this.repo.findById(id, userId);
    if (!existing) throw new NotFoundError("Categoria");

    return this.repo.update(id, data);
  }

  async delete(userId: string, id: string) {
    const existing = await this.repo.findById(id, userId);
    if (!existing) throw new NotFoundError("Categoria");

    await this.repo.delete(id);
    return true;
  }
}
