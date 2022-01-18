import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from '../components/header/header';
import PokemonList from '../components/pokemon/list/pokemon-list';
import './app.module.scss';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemonList: {
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
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache,
});

export function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <PokemonList />
    </ApolloProvider>
  );
}

export default App;
