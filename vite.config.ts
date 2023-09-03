import { readFileSync } from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import graphqlServer from 'vite-plugin-graphql-server'
import graphiql from 'vite-plugin-graphiql'
import { resolvers } from './server/resolvers'

export default defineConfig({
  plugins: [
    react(),
    graphqlServer({
      server: {
        path: 'graphql',
      },
      schema: {
        typeDefs: readFileSync('./server/schema.graphql', 'utf-8'),
        resolvers,
      },
    }),
    graphiql({
      client: {
        url: 'http://localhost:5173/graphql',
      },
    }),
  ],
})
