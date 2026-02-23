import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class TransactionListArgs {
  @Field(() => Int, { defaultValue: 10 })
  limit: number = 10;

  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;
}
