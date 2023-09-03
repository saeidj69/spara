# Front-End Challenge

This template provides a minimal setup for our front-end developer interview
assignment.

## Requirements

- [pnpm](https://pnpm.io/)
- [Node.js](https://nodejs.org/en/) (v18 or higher)

## Getting started

1. Clone this repository
2. Run `pnpm install`
3. Run `pnpm dev`
4. Open `http://localhost:5173/` in your browser

## GraphQL API

The GraphQL API is available at
[http://localhost:5173/graphql](http://localhost:5173/graphql). You can access
the [GraphiQL Playground](https://github.com/graphql/graphiql) to explore the
API at [http://localhost:5173/\_\_graphiql](http://localhost:5173/__graphiql).

You can also generate the TypeScript types for the GraphQL schema by running
`pnpm codegen`. The generated types will be available in `server/types.ts`.
