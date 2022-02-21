import { Link } from 'react-router-dom';
import { pokemonDetailsRoute } from '../../../../app/router';
import {
  Evolution as EvolutionModel,
  PokemonEvolution,
} from '../use-pokemon-details';

import './pokemon-evolutions.module.scss';

export type PokemonProps = PokemonEvolution;

function Pokemon({ id, name, imageUrl }: PokemonProps) {
  return (
    <Link
      to={pokemonDetailsRoute(id)}
      className="flex flex-col gap-2 items-center"
    >
      <div className="w-32 h-32 p-4 bg-slate-300 rounded-full">
        <img
          className="object-contain w-24 h-24"
          src={imageUrl}
          alt={name}
          width="96"
          height="96"
        />
      </div>
      <div className="capitalize">{name}</div>
    </Link>
  );
}

export type EvolutionProps = EvolutionModel;

function Evolution({ minLevel, from, to }: EvolutionProps) {
  return (
    <div
      className="flex w-full justify-between items-center"
      data-testid={`pokemon-evolution-${from.name}`}
    >
      <Pokemon {...from} />
      <Level level={minLevel} />
      <Pokemon {...to} />
    </div>
  );
}

interface LevelProps {
  level?: number | null;
}

function Level({ level }: LevelProps) {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div>→</div>
      <div>{level ? `Lvl ${level}` : '???'}</div>
    </div>
  );
}

export interface PokemonEvolutionsProps {
  evolutions?: EvolutionProps[];
}

export function PokemonEvolutions({ evolutions }: PokemonEvolutionsProps) {
  return (
    <div className="flex flex-col gap-8">
      {evolutions?.map((evolution) => (
        <Evolution key={evolution.from.id} {...evolution} />
      ))}
    </div>
  );
}

export default PokemonEvolutions;
