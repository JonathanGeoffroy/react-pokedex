import cn from 'classnames';
import './pokemon-type.module.scss';

export type PokemonType =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

type ByType = {
  [K in PokemonType]: string;
};

const BACKGROUND_TYPES: ByType = {
  normal: 'bg-neutral-700',
  fighting: 'bg-orange-700',
  flying: 'bg-sky-700',
  poison: 'bg-purple-700',
  ground: 'bg-amber-700',
  rock: 'bg-stone-700',
  bug: 'bg-lime-700',
  ghost: 'bg-violet-700',
  steel: 'bg-zinc-700',
  fire: 'bg-red-700',
  water: 'bg-blue-700',
  grass: 'bg-green-700',
  electric: 'bg-yellow-700',
  psychic: 'bg-fuchsia-700',
  ice: 'bg-cyan-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-700',
  fairy: 'bg-pink-700',
  unknown: 'transparent',
  shadow: 'bg-gray-700',
};

export interface PokemonTypeProps {
  type: PokemonType;
  className?: string;
}

export function PokemonType({ type, className }: PokemonTypeProps) {
  return (
    <div
      className={cn(
        'px-2 py-1 text-white text-sm text-center rounded-3xl w-full',
        BACKGROUND_TYPES[type],
        className
      )}
    >
      {type}
    </div>
  );
}

export default PokemonType;
