import cn from 'classnames';
import colors from '../../../app/colors';
import './pokemon-type.module.scss';
import { PokemonType as PokemonTypeModel } from '../list/pokemon-item.model';

export interface PokemonTypeProps {
  type: PokemonTypeModel;
  className?: string;
}

export function PokemonType({ type, className }: PokemonTypeProps) {
  return (
    <div
      className={cn(
        'px-2 py-1 text-white text-sm text-center rounded-3xl',
        colors[type.type].darker,
        className
      )}
    >
      {type.name}
    </div>
  );
}

export default PokemonType;
