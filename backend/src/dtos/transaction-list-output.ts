import { Field, Int, ObjectType } from "type-graphql";
import { TransactionModel } from "../models/transaction";

@ObjectType()
export class TransactionListOutput {
  @Field(() => [TransactionModel])
  items!: TransactionModel[];

  @Field(() => Int)
  total!: number;
}
