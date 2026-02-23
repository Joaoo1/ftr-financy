import { Field, Float, ID, InputType } from "type-graphql";
import { DateResolver } from "graphql-scalars";
import { TransactionType } from "../models/transaction";

@InputType()
export class CreateTransactionInput {
  @Field(() => Float)
  amount!: number;

  @Field(() => DateResolver)
  date!: Date;

  @Field(() => String)
  description!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => ID, { nullable: true })
  categoryId?: string;
}
