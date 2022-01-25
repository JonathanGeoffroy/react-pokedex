import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PokemonList from '../components/pokemon/list/pokemon-list';
export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
      </Routes>
    </BrowserRouter>
  );
}
