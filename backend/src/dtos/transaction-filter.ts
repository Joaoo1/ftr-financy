import { Field, InputType, Int } from "type-graphql";
import { TransactionType } from "../models/transaction";

@InputType()
export class TransactionFilter {
  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field(() => String, { nullable: true })
  description?: string;
}
