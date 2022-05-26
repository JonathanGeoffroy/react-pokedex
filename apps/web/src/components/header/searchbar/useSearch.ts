import { useContext, useEffect } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { LanguageContext } from '../../../app/language-provider';
import { useSearchPokemonLazyQuery } from '../../../__generated/pokeapi.graphql';

export default function useSearch(term: string) {
  const debounce = useDebounce();
  const [language] = useContext(LanguageContext);
  const [search, { data }] = useSearchPokemonLazyQuery();

  useEffect(() => {
    if (term.length) {
      debounce(() => search({ variables: { term, lang: language } }));
    }
  }, [term, language, search, debounce]);

  return data;
}
