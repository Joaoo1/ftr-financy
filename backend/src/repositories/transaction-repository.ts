import { prisma } from "../../prisma/prisma";
import { Prisma } from "../../generated/prisma/client";
import type { CreateTransactionInput } from "../dtos/create-transaction-input";
import type { UpdateTransactionInput } from "../dtos/update-transaction-input";
import type { TransactionFilter } from "../dtos/transaction-filter";

export class TransactionRepository {
  async create(userId: string, data: CreateTransactionInput) {
    return prisma.transaction.create({
      data: { ...data, userId },
      include: { category: true },
    });
  }

  async findById(id: string, userId: string) {
    return prisma.transaction.findFirst({ where: { id, userId } });
  }

  async list(
    userId: string,
    page: number,
    limit: number,
    filter?: TransactionFilter,
  ) {
    const skip = (page - 1) * limit;
    const pagination = limit === 0 ? ({} as {}) : { skip, take: limit };

    const where: Prisma.TransactionWhereInput = { userId };

    if (filter?.type) where.type = filter.type;
    if (filter?.categoryId) where.categoryId = filter.categoryId;
    if (filter?.description) {
      where.description = { contains: filter.description };
    }
    if (filter?.month || filter?.year) {
      const year = filter.year ?? new Date().getFullYear();
      const month = filter.month ?? 1;
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      where.date = { gte: start, lt: end };
    }

    const [items, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: { category: true },
        ...pagination,
      }),
      prisma.transaction.count({ where }),
    ]);
    return { items, total };
  }

  async update(id: string, data: Omit<UpdateTransactionInput, "id">) {
    return prisma.transaction.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  }
}
