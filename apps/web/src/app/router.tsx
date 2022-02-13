import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../components/header/header';
import PokemonDetails from '../components/pokemon/details/pokemon-details';
import PokemonList from '../components/pokemon/list/pokemon-list';

export function pokemonDetailsRoute(id: string) {
  return `/${id}`;
}
export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/:id" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
