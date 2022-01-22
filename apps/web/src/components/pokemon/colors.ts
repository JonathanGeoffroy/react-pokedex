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

export type ByType = {
  [K in PokemonType]: {
    background: string;
    tag: string;
  };
};

const colors: ByType = {
  normal: { background: 'bg-gray-200', tag: 'bg-gray-700' },
  fighting: { background: 'bg-orange-500', tag: 'bg-orange-700' },
  flying: { background: 'bg-sky-500', tag: 'bg-sky-700' },
  poison: { background: 'bg-purple-500', tag: 'bg-purple-700' },
  ground: { background: 'bg-amber-500', tag: 'bg-amber-700' },
  rock: { background: 'bg-stone-200', tag: 'bg-stone-700' },
  bug: { background: 'bg-emerald-500', tag: 'bg-emerald-700' },
  ghost: { background: 'bg-violet-200', tag: 'bg-violet-700' },
  steel: { background: 'bg-zinc-500', tag: 'bg-zinc-700' },
  fire: { background: 'bg-red-500', tag: 'bg-red-700' },
  water: { background: 'bg-blue-500', tag: 'bg-blue-700' },
  grass: { background: 'bg-green-500', tag: 'bg-green-700' },
  electric: { background: 'bg-yellow-500', tag: 'bg-yellow-700' },
  psychic: { background: 'bg-fuchsia-500', tag: 'bg-fuchsia-700' },
  ice: { background: 'bg-cyan-500', tag: 'bg-cyan-700' },
  dragon: { background: 'bg-indigo-500', tag: 'bg-indigo-700' },
  dark: { background: 'bg-gray-500', tag: 'bg-gray-700' },
  fairy: { background: 'bg-pink-500', tag: 'bg-pink-700' },
  unknown: { background: 'transparent', tag: 'transparent' },
  shadow: { background: 'bg-gray-500', tag: 'bg-gray-700' },
};

export default colors;
