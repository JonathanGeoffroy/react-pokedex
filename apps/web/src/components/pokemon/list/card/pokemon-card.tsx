import { Card } from '@react-pokedex/ui';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { PokemonType } from '../../type/pokemon-type';
import colors from '../../../../app/colors';
import { pokemonDetailsRoute } from '../../../../app/router';
import PokemonItemModel from '../pokemon-item.model';
import PokeballLoader from '../../../pokeball-loader/pokeball-loader';
import pokeball from './../../details/pokeball.svg';
import './pokemon-card.module.scss';

/* eslint-disable-next-line */
export interface CardProps {
  pokemon?: PokemonItemModel;
}

export function PokemonCard({ pokemon }: CardProps) {
  return (
    <Link to={pokemon ? pokemonDetailsRoute(pokemon.id) : '#'} state={pokemon}>
      <Card
        data-testid={`pokemon-card-${pokemon?.order || 'skeleton'}`}
        className={classNames(
          'w-48 md:w-72',
          pokemon?.types.length
            ? colors[pokemon.types[0]].background
            : undefined
        )}
      >
        <div className="w-full text-right text-neutral-900">
          {pokemon ? (
            pokemon.order ? (
              `#${pokemon.order.toString().padStart(3, '0')}`
            ) : (
              ''
            )
          ) : (
            <Skeleton width={64} />
          )}
        </div>
        <h2 className="text-lg text-center text-neutral-900 capitalize p-4">
          {pokemon?.name || <Skeleton />}
        </h2>

        <div className="flex flex-row justify-between items-center px-4 gap-4">
          <div className="flex flex-col gap-1 flex-grow">
            {pokemon?.types.map((type) => (
              <PokemonType key={type} className="w-full" type={type} />
            )) || <Skeleton />}
          </div>
          <div className="m-1 w-12 h-12 md:w-24 md:h-24">
            {pokemon ? (
              <img
                className="object-contain w-full h-full"
                src={pokemon.imageUrl}
                alt={pokemon.name}
                width="96"
                height="96"
              />
            ) : (
              <PokeballLoader />
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default Card;
