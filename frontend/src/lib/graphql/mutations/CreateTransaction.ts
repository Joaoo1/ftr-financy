import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: CreateTransactionInput!) {
    createTransaction(data: $data) {
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
