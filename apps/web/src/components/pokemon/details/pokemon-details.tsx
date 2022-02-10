import { usePokemonDetailsQuery } from '../../../__generated/pokeapi.graphql';
import { useParams } from 'react-router-dom';
import colors, { PokemonType as PokemonTypeModel } from '../colors';
import classNames from 'classnames';
import PokemonType from '../type/pokemon-type';
import { Item } from '@react-stately/collections';
import { Tabs } from '@react-pokedex/ui';

import './pokemon-details.module.scss';
import PokemonStats from '../stats/pokemon-stats';

/* eslint-disable-next-line */
export interface PokemonDetailsProps {}

export function PokemonDetails(props: PokemonDetailsProps) {
  const { id } = useParams();

  const { data, loading, error } = usePokemonDetailsQuery({
    variables: { id: parseInt(id!) },
  });

  if (error) {
    throw error;
  }

  const background = data
    ? colors[data.pokemonById.types[0] as PokemonTypeModel].background
    : null;

  return (
    <div
      className={classNames('min-h-screen h-full top-10 w-screen', background)}
    >
      <div className="max-w-screen-md mx-auto flex flex-col gap-4 px-16 pt-16">
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

        <div data-testid="types" className="flex gap-2">
          {data?.pokemonById.types.map((type: string) => (
            <PokemonType
              className="w-24"
              type={type as PokemonTypeModel}
              key={type}
            />
          ))}
        </div>

        <img
          data-testid="visual"
          className="self-center relative top-8"
          src={data?.pokemonById.imageUrl}
          alt={data?.pokemonById.name}
          width="192"
          height="192"
        />
      </div>

      <div className="max-w-screen-md mx-auto h-full bg-white w-screen rounded-t-3xl px-4 pt-16">
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
  );
}

export default PokemonDetails;
