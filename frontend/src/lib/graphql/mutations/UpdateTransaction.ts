import { gql } from "@apollo/client";

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($data: UpdateTransactionInput!) {
    updateTransaction(data: $data) {
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
      updatedAt
    }
  }
`;
