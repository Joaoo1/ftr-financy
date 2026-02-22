import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

async function bootstrap() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const app = express()

  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

bootstrap()

