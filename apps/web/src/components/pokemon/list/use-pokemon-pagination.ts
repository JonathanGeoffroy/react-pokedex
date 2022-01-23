import { useCallback, useState } from 'react';
import useScroll from '../../../hooks/useScroll';
import {
  Order_By,
  usePokemonListQuery,
} from '../../../__generated/pokeapi.graphql';

export const NB_ITEM_PER_PAGES = 24;

export default function usePokemonPagination() {
  const [offset, setOffset] = useState<number>(NB_ITEM_PER_PAGES);
  const [reachEnd, setReachEnd] = useState<boolean>(false);

  const { data, loading, error, fetchMore } = usePokemonListQuery({
    variables: {
      orderBy: [
        {
          id: Order_By.AscNullsLast,
        },
      ],
      limit: NB_ITEM_PER_PAGES,
    },
  });

  const fetchNext = useCallback(() => {
    setOffset((offset) => offset + NB_ITEM_PER_PAGES);

    return fetchMore({
      variables: {
        offset,
      },
    }).then(({ data }) => {
      if (data.pokemon_v2_pokemon.length === 0) {
        setReachEnd(true);
      }
    });
  }, [offset, fetchMore]);

  useScroll(fetchNext, !reachEnd);

  return {
    pokemonList: data?.pokemon_v2_pokemon || [],
    loading,
    error,
  };
}
