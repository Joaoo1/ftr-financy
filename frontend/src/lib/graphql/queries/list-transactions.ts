import { gql } from "@apollo/client";

export const LIST_TRANSACTIONS = gql`
  query GetTransactions($page: Int, $limit: Int) {
    transactions(page: $page, limit: $limit) {
      items {
        id
        description
        amount
        type
        date
        category {
          id
          title
          color
          icon
        }
        createdAt
      }
      total
    }
  }
`;
