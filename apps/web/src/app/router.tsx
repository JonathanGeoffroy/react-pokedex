import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header/header';
import PokeballLoader from '../components/pokeball-loader/pokeball-loader';

const PokemonDetails = lazy(
  () => import('../components/pokemon/details/pokemon-details')
);
const PokemonList = lazy(
  () => import('../components/pokemon/list/pokemon-list')
);

export function pokemonDetailsRoute(id: string) {
  return `/${id}`;
}
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense
        fallback={
          <PokeballLoader
            style={{ transform: 'translate(-50%, -50%)' }}
            className="fixed top-1/2 left-1/2 w-64 h-64"
          />
        }
      >
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/:id" element={<PokemonDetails />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
