import classNames from 'classnames';
import './pokemon-stats.module.scss';

export interface PokemonStatsProps {
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  if (!stats) {
    return null;
  }

  const { hp, attack, defense, specialAttack, specialDefense, speed } = stats;
  return (
    <div className="grid grid-cols-2 gap-2">
      <span>HP:</span>
      <PokemonStat data-testid="hp" stat={hp} />

      <span>Attack:</span>
      <PokemonStat data-testid="attack" stat={attack} />

      <span>Defense:</span>
      <PokemonStat data-testid="defense" stat={defense} />

      <span>Special Attack:</span>
      <PokemonStat data-testid="specialAttack" stat={specialAttack} />

      <span>Special Defense:</span>
      <PokemonStat data-testid="specialDefense" stat={specialDefense} />

      <span>Speed:</span>
      <PokemonStat data-testid="speed" stat={speed} />
    </div>
  );
}

interface PokemonStatProps {
  stat: number;
}

function PokemonStat({ stat, ...props }: PokemonStatProps) {
  return (
    <div {...props} className="flex flex-row items-center gap-2">
      <span>{stat}</span>
      <div className="w-full h-1 bg-gray-400 rounded-full">
        <div
          style={{ width: `${Math.min(100, stat)}%` }}
          className={classNames(
            'h-full rounded-full flex-grow-0',
            stat < 33
              ? 'bg-red-500'
              : stat < 50
              ? 'bg-orange-500'
              : 'bg-green-500'
          )}
        />
      </div>
    </div>
  );
}

export default PokemonStats;
