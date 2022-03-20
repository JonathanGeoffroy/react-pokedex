import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemon: {
          keyArgs: ['lang'],
          merge(existing = [], incoming, { args }) {
            // Workaround to avoid pokemon duplicates when changing language
            if (!args?.['offset']) {
              return incoming;
            }
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: process.env['NX_GRAPHQL_URI'],
  cache,
});

interface GraphQLProviderProps {
  children: React.ReactNode;
}

export default function GraphQLProvider({ children }: GraphQLProviderProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
