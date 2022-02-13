export type PokemonType =
  | 'default'
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

export type Color = {
  background: string;
  darker: string;
};

export type ByType = {
  [K in PokemonType]: Color;
};

const colors: ByType = {
  default: {background: 'bg-white', darker: 'bg-black'},
  normal: { background: 'bg-gray-200', darker: 'bg-gray-700' },
  fighting: { background: 'bg-orange-500', darker: 'bg-orange-700' },
  flying: { background: 'bg-sky-500', darker: 'bg-sky-700' },
  poison: { background: 'bg-purple-500', darker: 'bg-purple-700' },
  ground: { background: 'bg-amber-500', darker: 'bg-amber-700' },
  rock: { background: 'bg-stone-200', darker: 'bg-stone-700' },
  bug: { background: 'bg-emerald-500', darker: 'bg-emerald-700' },
  ghost: { background: 'bg-violet-200', darker: 'bg-violet-700' },
  steel: { background: 'bg-zinc-300', darker: 'bg-zinc-700' },
  fire: { background: 'bg-red-500', darker: 'bg-red-700' },
  water: { background: 'bg-blue-500', darker: 'bg-blue-700' },
  grass: { background: 'bg-green-500', darker: 'bg-green-700' },
  electric: { background: 'bg-yellow-500', darker: 'bg-yellow-700' },
  psychic: { background: 'bg-fuchsia-500', darker: 'bg-fuchsia-700' },
  ice: { background: 'bg-cyan-500', darker: 'bg-cyan-700' },
  dragon: { background: 'bg-indigo-300', darker: 'bg-indigo-700' },
  dark: { background: 'bg-neutral-400', darker: 'bg-neutral-700' },
  fairy: { background: 'bg-pink-500', darker: 'bg-pink-700' },
  unknown: { background: 'transparent', darker: 'transparent' },
  shadow: { background: 'bg-neutral-400', darker: 'bg-neutral-700' },
};

export default colors;
