import { useEffect } from 'react';
import { PokemonCard } from './card/pokemon-card';
import usePokemonPagination, {
  NB_ITEM_PER_PAGES,
} from './use-pokemon-pagination';
import useColor from '../../../app/useColor';

import './pokemon-list.module.scss';

export function List() {
  const { setColorType } = useColor();
  const { pokemonList, loading, error } = usePokemonPagination();

  useEffect(() => {
    setColorType('default');
  }, [setColorType]);

  if (error) {
    throw error;
  }
  return (
    <div
      data-testid="pokemon-list"
      className="max-w-screen-lg mx-auto pokemon-list flex flex-wrap justify-center gap-1 md:gap-4"
    >
      {loading
        ? [...Array(NB_ITEM_PER_PAGES).keys()].map((key) => (
            <PokemonCard key={key} />
          ))
        : pokemonList?.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
    </div>
  );
}

export default List;
