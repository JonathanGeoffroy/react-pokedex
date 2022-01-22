import {
  Order_By,
  usePokemonListQuery,
} from '../../../__generated/pokeapi.graphql';
import { PokemonCard } from '../card/pokemon-card';
import PokemonType from '../type/pokemon-type';
import './pokemon-list.module.scss';

export function List() {
  const { data, loading, error, fetchMore } = usePokemonListQuery({
    variables: {
      orderBy: [
        {
          id: Order_By.AscNullsLast,
        },
      ],
      limit: 120,
    },
  });

  if (error) {
    throw error;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!data?.pokemon_v2_pokemon) {
    return null;
  }
  return (
    <div className="m-4 max-w-screen-md mx-auto pokemon-list grid md:grid-cols-3 grid-cols-2 gap-4">
      {data?.pokemon_v2_pokemon?.map((pokemon) => (
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
