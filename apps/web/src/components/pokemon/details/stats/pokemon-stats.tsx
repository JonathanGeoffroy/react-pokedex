import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
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
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-2">
      <span>{t('stats.hp')}:</span>
      <PokemonStat data-testid="hp" stat={stats?.hp} />

      <span>{t('stats.attack')}:</span>
      <PokemonStat data-testid="attack" stat={stats?.attack} />

      <span>{t('stats.defense')}:</span>
      <PokemonStat data-testid="defense" stat={stats?.defense} />

      <span>{t('stats.special_attack')}:</span>
      <PokemonStat data-testid="specialAttack" stat={stats?.specialAttack} />

      <span>{t('stats.special_defense')}:</span>
      <PokemonStat data-testid="specialDefense" stat={stats?.specialDefense} />

      <span>{t('stats.speed')}:</span>
      <PokemonStat data-testid="speed" stat={stats?.speed} />
    </div>
  );
}

interface PokemonStatProps {
  stat?: number;
}

function PokemonStat({ stat, ...props }: PokemonStatProps) {
  return (
    <div {...props} className="flex flex-row items-center gap-2">
      <span>{stat}</span>
      {stat ? (
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
      ) : (
        <Skeleton height={4} width={150} />
      )}
    </div>
  );
}

export default PokemonStats;
