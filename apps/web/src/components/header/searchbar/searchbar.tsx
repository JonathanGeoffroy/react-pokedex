import { useTranslation } from 'react-i18next';
import { Input, Card } from '@react-pokedex/ui';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { EmojiSadIcon, SearchIcon } from '@heroicons/react/outline';
import Results from './results/results';
import useResults from './useResults';

import './searchbar.module.scss';

export type SearchbarProps = React.HTMLProps<HTMLDivElement>;

export function Searchbar({ className, ...passThrough }: SearchbarProps) {
  const [term, setTerm] = useState<string>('');
  const { resultsOpen, setResultsOpen, focus, setFocus, data } =
    useResults(term);

  const { t } = useTranslation();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setFocus(false);
        setResultsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setFocus, setResultsOpen]);

  const bigSearch = focus || resultsOpen;

  return (
    <>
      {bigSearch ? (
        <div className="fixed z-50 top-0 left-0 w-screen h-screen opacity-50 bg-black" />
      ) : null}

      <div
        ref={ref}
        data-testid="searchbar"
        className={classNames(
          bigSearch ? 'fixed md:relative left-0 top-0 w-full z-50' : 'w-64',
          'max-w-screen-md transition-all',
          className
        )}
        onClick={() => {
          setFocus(true);
        }}
        {...passThrough}
      >
        <Input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={classNames(!bigSearch && 'width-0 sm:width-full')}
          wrapperClassName={
            !bigSearch
              ? 'rounded-full border-none bg-transparent sm:border-full sm:bg-gray-100 text-white sm:text-black'
              : undefined
          }
          inputClassName={classNames(!bigSearch && 'hidden sm:block')}
          placeholder={t('Search')}
          aria-label={t('Search')}
          value={term}
          onValueChange={setTerm}
          data-testid="searchbar-input"
          left={<SearchIcon className="h-8 w-8" />}
        />

        {resultsOpen && data ? (
          <Card
            data-testid="searchbar-resultlist"
            className="z-50 absolute top-12 w-full shadow p-4 bg-white flex flex-col max-h-64 overflow-y-auto"
          >
            {data.searchPokemon.length ? (
              <Results
                data={data}
                onSelect={() => {
                  setTerm('');
                  setResultsOpen(false);
                }}
              />
            ) : (
              <div className="flex flex-row gap-4 items-center">
                <EmojiSadIcon
                  className="h-16 w-16"
                  aria-label={t('no_result')}
                />{' '}
                {t('no_result')}
              </div>
            )}
          </Card>
        ) : null}
      </div>
    </>
  );
}

export default Searchbar;
