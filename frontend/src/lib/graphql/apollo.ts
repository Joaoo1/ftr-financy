import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const apiLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

export const apolloClient = new ApolloClient({
  link: apiLink,
  cache: new InMemoryCache(),
});
