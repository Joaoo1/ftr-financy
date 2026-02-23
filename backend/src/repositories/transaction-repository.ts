import { prisma } from "../../prisma/prisma";
import type { CreateTransactionInput } from "../dtos/create-transaction-input";
import type { UpdateTransactionInput } from "../dtos/update-transaction-input";

export class TransactionRepository {
  async create(userId: string, data: CreateTransactionInput) {
    return prisma.transaction.create({
      data: { ...data, userId },
    });
  }

  async findById(id: string, userId: string) {
    return prisma.transaction.findFirst({ where: { id, userId } });
  }

  async list(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const pagination = limit === 0 ? ({} as {}) : { skip, take: limit };

    const [items, total] = await prisma.$transaction([
      prisma.transaction.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: { category: true },
        ...pagination,
      }),
      prisma.transaction.count({ where: { userId } }),
    ]);
    return { items, total };
  }

  async update(id: string, data: Omit<UpdateTransactionInput, "id">) {
    return prisma.transaction.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  }
}
