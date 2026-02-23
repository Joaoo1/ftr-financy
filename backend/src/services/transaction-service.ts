import { TransactionRepository } from "../repositories/transaction-repository";
import { NotFoundError } from "../errors/not-found-error";
import type { CreateTransactionInput } from "../dtos/create-transaction-input";
import type { UpdateTransactionInput } from "../dtos/update-transaction-input";

export class TransactionService {
  private repo = new TransactionRepository();

  async create(userId: string, input: CreateTransactionInput) {
    return this.repo.create(userId, input);
  }

  async list(userId: string) {
    return this.repo.list(userId);
  }

  async update(userId: string, input: UpdateTransactionInput) {
    const { id, ...data } = input;

    const existing = await this.repo.findById(id, userId);
    if (!existing) throw new NotFoundError("Transação");

    return this.repo.update(id, data);
  }

  async delete(userId: string, id: string) {
    const existing = await this.repo.findById(id, userId);
    if (!existing) throw new NotFoundError("Transação");

    await this.repo.delete(id);
    return true;
  }
}
