import { prisma } from "../../prisma/prisma";
import type { CreateCategoryInput } from "../dtos/create-category-input";
import type { UpdateCategoryInput } from "../dtos/update-category-input";
import { CategorySortBy } from "../dtos/category-list-args";

export class CategoryRepository {
  async create(userId: string, data: CreateCategoryInput) {
    return prisma.category.create({
      data: { ...data, userId },
    });
  }

  async findById(id: string, userId: string) {
    return prisma.category.findFirst({ where: { id, userId } });
  }

  async list(
    userId: string,
    page: number,
    limit: number,
    sortBy: CategorySortBy,
  ) {
    const skip = (page - 1) * limit;

    const orderBy =
      sortBy === CategorySortBy.TRANSACTIONS_COUNT
        ? { transactions: { _count: "desc" as const } }
        : { title: "asc" as const };

    const pagination = limit === 0 ? ({} as {}) : { skip, take: limit };

    const [raw, total] = await prisma.$transaction([
      prisma.category.findMany({
        where: { userId },
        orderBy,
        include: { transactions: { select: { amount: true } } },
        ...pagination,
      }),
      prisma.category.count({ where: { userId } }),
    ]);

    const items = raw.map(({ transactions, ...cat }) => ({
      ...cat,
      transactionsCount: transactions.length,
      transactionsTotalAmount: transactions.reduce(
        (sum, t) => sum + t.amount,
        0,
      ),
    }));

    return { items, total };
  }

  async update(id: string, data: Omit<UpdateCategoryInput, "id">) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.category.delete({ where: { id } });
  }
}
