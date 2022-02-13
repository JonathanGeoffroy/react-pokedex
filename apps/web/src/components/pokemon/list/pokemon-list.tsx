import { useEffect } from 'react';
import { PokemonCard } from '../card/pokemon-card';
import { PokemonType } from '../../../app/colors';
import usePokemonPagination from './use-pokemon-pagination';
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

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div
      data-testid="pokemon-list"
      className="max-w-screen-lg mx-auto pokemon-list flex flex-wrap justify-center gap-1 md:gap-4"
    >
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          order={pokemon.order}
          types={pokemon.types as PokemonType[]}
          sprite={pokemon.imageUrl}
        />
      ))}
    </div>
  );
}

export default List;
