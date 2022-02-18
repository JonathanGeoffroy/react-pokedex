import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '@react-stately/collections';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Tabs } from '@react-pokedex/ui';
import classNames from 'classnames';
import { PokemonType as PokemonTypeModel } from '../../../app/colors';
import PokemonStats from './stats/pokemon-stats';
import PokemonType from '../type/pokemon-type';
import useColor from '../../../app/useColor';
import PokemonAbout from './about/pokemon-about';
import PokemonEvolutions from './evolutions/pokemon-evolutions';
import usePokemonDetails from './use-pokemon-details';
import pokeball from './pokeball.svg';
import classes from './pokemon-details.module.scss';

/* eslint-disable-next-line */
export interface PokemonDetailsProps {}

export function PokemonDetails(props: PokemonDetailsProps) {
  const { id } = useParams();
  const { setColorType } = useColor();
  const pokemon = usePokemonDetails(parseInt(id!));

  useEffect(() => {
    if (!pokemon) {
      return;
    }

    const pokemonType = pokemon.types[0] as PokemonTypeModel;
    setColorType(pokemonType);
  }, [pokemon, setColorType]);

  return (
    <div
      className={classNames(
        classes['pokemon-details'],
        'h-full max-w-screen-md mx-auto flex flex-col'
      )}
    >
      <div className={`flex flex-col gap-4 ${classes['padding']}`}>
        <div className="flex justify-between">
          <h2 className="text-3xl text-center text-neutral-900 capitalize">
            {pokemon?.name || <Skeleton width={220} />}
          </h2>
          <div className="text-neutral-900">
            {pokemon ? (
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
          {pokemon?.types.map((type: string) => (
            <PokemonType
              className="w-24"
              type={type as PokemonTypeModel}
              key={type}
            />
          )) || <Skeleton width={128} />}
        </div>
      </div>
      <img
        data-testid="visual"
        className="self-center relative top-12 z-10 h-48  w-48"
        src={pokemon?.imageUrl || pokeball}
        alt={pokemon?.name}
        width="192"
        height="192"
      />

      <div className="relative w-full h-full max-w-screen-md mx-auto">
        <div
          className={`${classes['padding']} absolute bottom-0 w-full h-full flex flex-grow bg-gray-100 rounded-t-3xl`}
        >
          <Tabs aria-label="Pokemon Details">
            <Item key="About" title="About">
              <PokemonAbout
                description={pokemon?.description}
                height={pokemon?.height}
                weight={pokemon?.weight}
              />
            </Item>
            <Item key="stats" title="Base stats">
              <PokemonStats stats={pokemon?.stats} />
            </Item>
            <Item key="evolutions" title="Evolutions">
              <PokemonEvolutions evolutions={pokemon?.evolutions} />
            </Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
