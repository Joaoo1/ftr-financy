import { prisma } from "../../prisma/prisma";
import type { CreateCategoryInput } from "../dtos/create-category-input";
import type { UpdateCategoryInput } from "../dtos/update-category-input";

export class CategoryRepository {
  async create(userId: string, data: CreateCategoryInput) {
    return prisma.category.create({
      data: { ...data, userId },
    });
  }

  async findById(id: string, userId: string) {
    return prisma.category.findFirst({ where: { id, userId } });
  }

  async list(userId: string) {
    return prisma.category.findMany({
      where: { userId },
      orderBy: { title: "asc" },
    });
  }

  async update(id: string, data: Omit<UpdateCategoryInput, "id">) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}
