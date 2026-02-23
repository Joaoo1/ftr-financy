import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { DateResolver } from "graphql-scalars";

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

registerEnumType(TransactionType, {
  name: "TransationType",
  description: "Type of the transaction",
});

@ObjectType()
export class TransactionModel {
  @Field(() => ID)
  id!: string;

  @Field(() => Float)
  amount!: number;

  @Field(() => DateResolver)
  date!: Date;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
