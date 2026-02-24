import { ArgsType, Field, Int } from "type-graphql";
import { TransactionFilter } from "./transaction-filter";

@ArgsType()
export class TransactionListArgs {
  @Field(() => Int, { defaultValue: 0 })
  limit: number = 0;

  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;

  @Field(() => TransactionFilter, { nullable: true })
  filter?: TransactionFilter;
}
