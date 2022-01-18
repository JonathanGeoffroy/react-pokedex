import './pokemon-card.module.scss';
import { Card } from '@react-pokedex/ui';
import { CSSProperties } from 'react';
import { PokemonType } from '../type/pokemon-type';

/* eslint-disable-next-line */
export interface CardProps {
  name: string;
  order?: number | null;
  sprite: string;
  types: PokemonType[];
}

export function PokemonCard({ name, order, sprite, types }: CardProps) {
  return (
    <Card>
      <div className="w-full text-right text-gray-400">
        {order ? `#${order}` : ''}
      </div>
      <h3 className="text-lg text-gray-500 capitalize">{name}</h3>

      <div className="flex flex-row justify-between items-center gap-4">
        <div className="flex flex-col gap-1 flex-grow">
          {types.map((type) => (
            <PokemonType key={type} className="w-full" type={type} />
          ))}
        </div>
        <img src={sprite} alt={name} />
      </div>
    </Card>
  );
}

export default Card;
