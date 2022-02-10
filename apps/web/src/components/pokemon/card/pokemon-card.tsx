import './pokemon-card.module.scss';
import { Card } from '@react-pokedex/ui';
import { PokemonType } from '../type/pokemon-type';
import colors, { PokemonType as Type } from '../colors';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { pokemonDetailsRoute } from '../../../app/router';

/* eslint-disable-next-line */
export interface CardProps {
  id: string;
  name: string;
  order?: number | null;
  sprite: string;
  types: Type[];
}

export function PokemonCard({ id, name, order, sprite, types }: CardProps) {
  return (
    <Link to={pokemonDetailsRoute(id)}>
      <Card
        data-testid={`pokemon-card-${order}`}
        className={classNames(
          'w-48 md:w-72',
          types.length ? colors[types[0]].background : undefined
        )}
      >
        <div className="w-full text-right text-neutral-900">
          {order ? `#${order.toString().padStart(3, '0')}` : ''}
        </div>
        <h2 className="text-lg text-center text-neutral-900 capitalize p-4">
          {name}
        </h2>

        <div className="flex flex-row justify-between items-center px-4 gap-4">
          <div className="flex flex-col gap-1 flex-grow">
            {types.map((type) => (
              <PokemonType key={type} className="w-full" type={type} />
            ))}
          </div>
          <img
            className="m-1 object-contain w-12 h-12 md:w-24 md:h-24"
            src={sprite}
            alt={name}
            width="96"
            height="96"
          />
        </div>
      </Card>
    </Link>
  );
}

export default Card;
