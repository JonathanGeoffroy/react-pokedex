import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Item } from '@react-stately/collections';
import { Tabs } from '@react-pokedex/ui';
import classNames from 'classnames';
import { usePokemonDetailsQuery } from '../../../__generated/pokeapi.graphql';
import { PokemonType as PokemonTypeModel } from '../../../app/colors';
import PokemonStats from '../stats/pokemon-stats';
import PokemonType from '../type/pokemon-type';
import classes from './pokemon-details.module.scss';
import useColor from '../../../app/useColor';

/* eslint-disable-next-line */
export interface PokemonDetailsProps {}

export function PokemonDetails(props: PokemonDetailsProps) {
  const { id } = useParams();
  const { setColorType } = useColor();
  const { data, error } = usePokemonDetailsQuery({
    variables: { id: parseInt(id!) },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    const pokemonType = data.pokemonById.types[0] as PokemonTypeModel;
    setColorType(pokemonType);
  }, [data, setColorType]);

  if (error) {
    throw error;
  }

  return (
    <div
      className={classNames(
        classes['pokemon-details'],
        'h-full max-w-screen-md mx-auto flex flex-col pt-16'
      )}
    >
      <div className="flex flex-col gap-4 px-4 md:px-16">
        <div className="flex justify-between">
          <h2 className="text-3xl text-center text-neutral-900 capitalize">
            {data?.pokemonById.name}
          </h2>
          <div className="text-neutral-900">
            {data
              ? `#${data.pokemonById.order.toString().padStart(3, '0')}`
              : ''}
          </div>
        </div>

        <div
          data-testid="types"
          className="flex justify-start flex-grow-0 gap-2"
        >
          {data?.pokemonById.types.map((type: string) => (
            <PokemonType
              className="w-24"
              type={type as PokemonTypeModel}
              key={type}
            />
          ))}
        </div>
      </div>
      <img
        data-testid="visual"
        className="self-center relative top-12 z-10"
        src={data?.pokemonById.imageUrl}
        alt={data?.pokemonById.name}
        width="192"
        height="192"
      />

      <div className="relative w-full h-full max-w-screen-md mx-auto">
        <div className="absolute bottom-0 w-full h-full flex flex-grow bg-gray-100 rounded-t-3xl px-4 md:px-16 pt-16">
          <Tabs aria-label="Pokemon Details">
            <Item key="About" title="About">
              Arma virumque cano, Troiae qui primus ab oris.
            </Item>
            <Item key="stats" title="Base stats">
              <PokemonStats stats={data?.pokemonById.stats} />
            </Item>
            <Item key="evolutions" title="Evolutions">
              Alea jacta est.
            </Item>
            <Item key="moves" title="Moves">
              Alea jacta est.
            </Item>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
