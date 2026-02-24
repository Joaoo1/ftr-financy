import { prisma } from "../../prisma/prisma";
import type { CreateUserInput } from "../dtos/create-user-input";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";

export class UserRepository {
  async createUser(data: CreateUserInput & { password: string }) {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async updateUser(id: string, name: string) {
    return prisma.user.update({ where: { id }, data: { name } });
  }

  async listUsers() {
    return prisma.user.findMany();
  }
}
