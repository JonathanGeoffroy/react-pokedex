import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { ApolloError } from '@apollo/client';
import { LanguageContext } from '../../../app/language-provider';
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
  const [lang] = useContext(LanguageContext);

  const { data, loading, error, fetchMore } = usePokemonListQuery({
    variables: {
      limit: NB_ITEM_PER_PAGES,
      lang,
    },
  });

  useEffect(() => {
    setOffset(0);
  }, [lang]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [lang]);

  const fetchNext = useCallback(() => {
    if (loading) {
      return Promise.resolve();
    }

    const newOffset = offset + NB_ITEM_PER_PAGES;
    return fetchMore({
      variables: {
        offset: newOffset,
      },
    }).then((res) => {
      setOffset(newOffset);
      if (res.data.pokemon.length === 0) {
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
