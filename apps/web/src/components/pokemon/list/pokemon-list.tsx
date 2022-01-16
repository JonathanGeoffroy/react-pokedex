import {
  Order_By,
  usePokemonListQuery,
} from '../../../__generated/pokeapi.graphql';
import './pokemon-list.module.scss';

/* eslint-disable-next-line */
export interface ListProps {}

export function List(props: ListProps) {
  const { data, loading, error } = usePokemonListQuery({
    variables: {
      orderBy: [
        {
          name: Order_By.Desc,
        },
      ],
      limit: 9,
      offset: null,
    },
  });
  if (error) {
    console.error(error);
    return <div>GraphQL Error</div>;
  }

  if (loading) {
    return <div>Loading ...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.pokemon_v2_pokemon.map((pokemon) => (
        <div key={pokemon.id} className="rounded">
          {pokemon.name}
        </div>
      ))}
    </div>
  );
}

export default List;
