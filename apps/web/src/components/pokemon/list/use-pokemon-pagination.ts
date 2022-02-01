import { useCallback, useMemo, useState } from 'react';
import useScroll from '../../../hooks/useScroll';
import { usePokemonListQuery } from '../../../__generated/pokeapi.graphql';

export const NB_ITEM_PER_PAGES = 24;

export default function usePokemonPagination() {
  const [offset, setOffset] = useState<number>(NB_ITEM_PER_PAGES);
  const [reachEnd, setReachEnd] = useState<boolean>(false);

  const { data, loading, error, fetchMore } = usePokemonListQuery({
    variables: {
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
      if (data.pokemon.length === 0) {
        setReachEnd(true);
      }
    });
  }, [offset, fetchMore]);

  useScroll(fetchNext, !reachEnd);

  const pokemonList = useMemo(
    () => data?.pokemon.map(({ details }) => details) || [],
    [data]
  );

  return {
    pokemonList,
    loading,
    error,
  };
}
