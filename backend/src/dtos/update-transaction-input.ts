import { Field, Float, ID, InputType } from "type-graphql";
import { DateResolver } from "graphql-scalars";
import { TransactionType } from "../models/transaction";

@InputType()
export class UpdateTransactionInput {
  @Field(() => ID)
  id!: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field(() => DateResolver, { nullable: true })
  date?: Date;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => TransactionType, { nullable: true })
  type?: TransactionType;

  @Field(() => ID, { nullable: true })
  categoryId?: string;
}
