import { useCallback, useMemo, useState } from 'react';
import { ApolloError } from '@apollo/client';
import useScroll from '../../../hooks/useScroll';
import { usePokemonListQuery } from '../../../__generated/pokeapi.graphql';
import PokemonItemModel from './pokemon-item.model';

export const NB_ITEM_PER_PAGES = 24;

export interface UsePokemonPagination {
  loading: boolean;
  pokemonList?: PokemonItemModel[];
  error?: ApolloError;
}

export default function usePokemonPagination(): UsePokemonPagination {
  const [offset, setOffset] = useState<number>(NB_ITEM_PER_PAGES);
  const [reachEnd, setReachEnd] = useState<boolean>(false);

  const { data, loading, error, fetchMore } = usePokemonListQuery({
    variables: {
      limit: NB_ITEM_PER_PAGES,
    },
  });

  const fetchNext = useCallback(() => {
    if (loading) {
      return Promise.resolve();
    }

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
  }, [offset, fetchMore, loading]);

  useScroll(fetchNext, !loading && !reachEnd);

  const pokemonList = useMemo(
    () =>
      data?.pokemon.map((pokemon) => ({
        ...pokemon,
      })),
    [data]
  );

  return {
    pokemonList,
    loading,
    error,
  };
}
