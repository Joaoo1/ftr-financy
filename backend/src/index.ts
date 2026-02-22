import "reflect-metadata";

import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';

async function bootstrap() {
  const schema = await buildSchema({ resolvers });
  const server = new ApolloServer({ schema });

  const app = express()

  app.use(cors({
    origin: '*',
    credentials: true,
  }))

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

bootstrap()

