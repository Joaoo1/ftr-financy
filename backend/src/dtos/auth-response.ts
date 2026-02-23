import { Field, ObjectType } from "type-graphql";
import { UserModel } from "../models/user";

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  token!: string;

  @Field(() => UserModel)
  user!: UserModel;
}
