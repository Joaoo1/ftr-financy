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

  async list(userId: string) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  }

  async update(id: string, data: Omit<UpdateTransactionInput, "id">) {
    return prisma.transaction.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.transaction.delete({ where: { id } });
  }
}
