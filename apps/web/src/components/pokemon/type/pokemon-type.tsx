import cn from 'classnames';
import colors, { PokemonType as Type } from '../colors';
import './pokemon-type.module.scss';

export interface PokemonTypeProps {
  type: Type;
  className?: string;
}

export function PokemonType({ type, className }: PokemonTypeProps) {
  return (
    <div
      className={cn(
        'px-2 py-1 text-white text-sm text-center rounded-3xl',
        colors[type].tag,
        className
      )}
    >
      {type}
    </div>
  );
}

export default PokemonType;
