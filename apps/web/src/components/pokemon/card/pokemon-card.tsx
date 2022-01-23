import './pokemon-card.module.scss';
import { Card } from '@react-pokedex/ui';
import { PokemonType } from '../type/pokemon-type';
import colors, { PokemonType as Type } from '../colors';

/* eslint-disable-next-line */
export interface CardProps {
  name: string;
  order?: number | null;
  sprite: string;
  types: Type[];
}

export function PokemonCard({ name, order, sprite, types }: CardProps) {
  return (
    <Card
      data-testid={`pokemon-card-${order}`}
      className={types.length ? colors[types[0]].background : undefined}
    >
      <div className="w-full text-right text-neutral-900">
        {order ? `#${order.toString().padStart(3, '0')}` : ''}
      </div>
      <h3 className="text-lg text-center text-neutral-900 capitalize">
        {name}
      </h3>

      <div className="flex flex-row justify-between items-center px-4 gap-4">
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
