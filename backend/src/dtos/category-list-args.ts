import { ArgsType, Field, Int, registerEnumType } from "type-graphql";

export enum CategorySortBy {
  TITLE = "title",
  TRANSACTIONS_COUNT = "transactionsCount",
}

registerEnumType(CategorySortBy, { name: "CategorySortBy" });

@ArgsType()
export class CategoryListArgs {
  @Field(() => Int, { defaultValue: 0 })
  limit: number = 0;

  @Field(() => Int, { defaultValue: 1 })
  page: number = 1;

  @Field(() => CategorySortBy, { defaultValue: CategorySortBy.TITLE })
  sortBy: CategorySortBy = CategorySortBy.TITLE;
}
