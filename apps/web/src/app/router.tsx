import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonDetails from '../components/pokemon/details/pokemon-details';
import PokemonList from '../components/pokemon/list/pokemon-list';

export function pokemonDetailsRoute(id: string) {
  return `/${id}`;
}
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
