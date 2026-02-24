import { UserRepository } from "../repositories/user-repository";
import { NotFoundError } from "../errors/not-found-error";

export class UserService {
  private userRepository = new UserRepository();

  async updateUser(userId: string, name: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new NotFoundError("User");

    return this.userRepository.updateUser(userId, name);
  }
}
