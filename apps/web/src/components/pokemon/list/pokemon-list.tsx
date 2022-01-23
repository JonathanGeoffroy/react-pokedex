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
      className="m-4 max-w-screen-md mx-auto pokemon-list grid md:grid-cols-3 grid-cols-2 gap-4"
    >
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          name={pokemon.name}
          order={pokemon.order}
          types={
            pokemon.types.map(({ type }) => type!.name as PokemonType) || []
          }
          sprite={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
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
