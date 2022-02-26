import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

console.log(process.env['NX_GRAPHQL_URI'])
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemon: {
          keyArgs: false,
          merge(existing = [], incoming) {
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
