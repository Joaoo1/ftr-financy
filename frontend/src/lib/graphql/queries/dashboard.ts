import { gql } from "@apollo/client";

export const DASHBOARD = gql`
  query Dashboard {
    categories(sortBy: TRANSACTIONS_COUNT) {
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

    transactions {
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
