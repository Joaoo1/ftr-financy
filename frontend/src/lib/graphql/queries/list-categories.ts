import { gql } from "@apollo/client";

export const LIST_CATEGORIES = gql`
  query GetCategories($page: Int, $limit: Int, $sortBy: CategorySortBy) {
    categories(page: $page, limit: $limit, sortBy: $sortBy) {
      items {
        id
        title
        description
        icon
        color
        createdAt
        transactionsCount
        transactionsTotalAmount
      }
      total
    }
  }
`;
