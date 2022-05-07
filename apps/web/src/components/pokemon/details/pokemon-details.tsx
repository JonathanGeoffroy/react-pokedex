import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '@react-stately/collections';
import Skeleton from 'react-loading-skeleton';
import { Tabs } from '@react-pokedex/ui';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import useColor from '../../../app/useColor';
import PokeballLoader from '../../pokeball-loader/pokeball-loader';
import { PokemonType } from '../type/pokemon-type';
import classes from './pokemon-details.module.scss';
import PokemonStats from './stats/pokemon-stats';
import PokemonAbout from './about/pokemon-about';
import PokemonEvolutions from './evolutions/pokemon-evolutions';
import SiblingPokemon from './sibling/sibling-pokemon';
import usePokemonDetails from './use-pokemon-details';

/* eslint-disable-next-line */
export interface PokemonDetailsProps {}

export function PokemonDetails(props: PokemonDetailsProps) {
  const { id } = useParams();
  const { setColorType } = useColor();
  const pokemon = usePokemonDetails(id!);
  const { t } = useTranslation();

  useEffect(() => {
    if (!pokemon?.types) {
      return;
    }

    const pokemonType = pokemon.types[0].type;
    setColorType(pokemonType);
  }, [pokemon, setColorType]);

  return (
    <div
      className={classNames(
        classes['pokemon-details'],
        'h-full max-w-screen-md mx-auto flex flex-col overflow-x-hidden'
      )}
    >
      <div className={`flex flex-col gap-4 ${classes['padding']}`}>
        <div className="flex justify-between">
          <h2 className="text-3xl text-center text-neutral-900 capitalize">
            {pokemon?.name || <Skeleton width={220} />}
          </h2>
          <div className="text-neutral-900">
            {pokemon?.order ? (
              `#${pokemon.order.toString().padStart(3, '0')}`
            ) : (
              <Skeleton width={64} />
            )}
          </div>
        </div>

        <div
          data-testid="types"
          className="flex justify-start flex-grow-0 gap-2"
        >
          {pokemon?.types?.map((type) => (
            <PokemonType className="w-24" type={type} key={type.type} />
          )) || <Skeleton width={128} />}
        </div>
      </div>

      <div className="flex flex-row justify-between items-end -mx-8 sm:mx-0">
        <SiblingPokemon pokemon={pokemon?.previous} />
        <div className="self-center relative top-12 z-10 h-48 w-48">
          {pokemon ? (
            <img
              className="w-full h-full"
              data-testid="visual"
              src={pokemon?.imageUrl}
              alt={pokemon?.name}
              width="192"
              height="192"
            />
          ) : (
            <PokeballLoader />
          )}
        </div>
        <SiblingPokemon pokemon={pokemon?.next} />
      </div>

      <div className="relative w-full h-full max-w-screen-md mx-auto">
        <div
          className={`${classes['padding']} absolute bottom-0 w-full h-full flex flex-grow bg-gray-100 rounded-t-3xl`}
        >
          <Tabs aria-label="Pokemon Details">
            <Item key="About" title={t('about')}>
              <PokemonAbout
                description={pokemon?.description}
                height={pokemon?.height}
                weight={pokemon?.weight}
              />
            </Item>
            <Item key="stats" title={t('base_stats')}>
              <PokemonStats stats={pokemon?.stats} />
            </Item>
            <Item key="evolutions" title={t('evolutions')}>
              <PokemonEvolutions evolutions={pokemon?.evolutions} />
            </Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
