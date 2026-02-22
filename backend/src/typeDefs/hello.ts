import { gql } from 'apollo-server-express';

export const helloTypeDefs = gql`
  type Query {
    hello: String
  }
`;
