import { PokemonCard } from '../card/pokemon-card';
import { PokemonType } from '../colors';
import './pokemon-list.module.scss';
import usePokemonPagination from './use-pokemon-pagination';

export function List() {
  const { pokemonList, loading, error } = usePokemonPagination();

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
          name={pokemon.name}
          order={pokemon.order}
          types={pokemon.types as PokemonType[]}
          sprite={pokemon.imageUrl}
        />
      ))}
    </div>
  );
}

/*
 <div className="grid grid-cols-3 gap-4">
      {data?.pokemon_v2_pokemon.map((pokemon) => (
        <div key={pokemon.id} className="rounded">
          {pokemon.name}
        </div>
      ))}
    </div>
*/

export default List;
