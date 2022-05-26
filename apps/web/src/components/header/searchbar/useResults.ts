import { useEffect, useState } from 'react';
import useSearch from './useSearch';

export default function (term: string) {
  const data = useSearch(term);

  const [resultsOpen, setResultsOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  useEffect(() => {
    if (!term.length) {
      setResultsOpen(false);
    } else if (focus) {
      setResultsOpen(true);
    }
  }, [term, focus]);

  useEffect(() => {
    if (data?.searchPokemon) {
      setResultsOpen(true);
    }
  }, [data]);

  return { resultsOpen, setResultsOpen, focus, setFocus, data };
}
