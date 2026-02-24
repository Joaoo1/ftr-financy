import { gql } from "@apollo/client";

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($data: UpdateCategoryInput!) {
    updateCategory(data: $data) {
      id
      title
      description
      icon
      color
      createdAt
      updatedAt
    }
  }
`;
