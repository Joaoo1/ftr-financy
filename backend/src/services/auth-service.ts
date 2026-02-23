import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import type { RegisterInput } from "../dtos/register-input";
import type { LoginInput } from "../dtos/login-input";

export class AuthService {
  private userRepository = new UserRepository();

  async register(input: RegisterInput) {
    const hashed = await bcrypt.hash(input.password, 10);

    const alreadyExists = await this.userRepository.findByEmail(input.email);

    if (alreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.createUser({
      name: input.name,
      email: input.email,
      password: hashed,
    });

    const token = this.signToken(user.id);

    return { token, user };
  }

  async login(input: LoginInput) {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user || !user.password) {
      throw new InvalidCredentialsError();
    }

    const valid = await bcrypt.compare(input.password, user.password);

    if (!valid) {
      throw new InvalidCredentialsError();
    }

    const token = this.signToken(user.id);

    return { token, user };
  }

  private signToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  }
}
