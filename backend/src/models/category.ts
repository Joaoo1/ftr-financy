import { Field, Float, GraphQLISODateTime, ID, ObjectType } from "type-graphql";

@ObjectType()
export class CategoryModel {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  description?: string | null;

  @Field(() => String)
  icon!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
