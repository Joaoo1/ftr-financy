import { Field, Int, ObjectType } from "type-graphql";
import { CategoryModel } from "../models/category";

@ObjectType()
export class CategoryListOutput {
  @Field(() => [CategoryModel])
  items!: CategoryModel[];

  @Field(() => Int)
  total!: number;
}
