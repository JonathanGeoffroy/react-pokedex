import Skeleton from 'react-loading-skeleton';
import classes from './pokemon-about.module.scss';

export interface PokemonAboutProps {
  description?: string;
  height?: number;
  weight?: number;
}

export function PokemonAbout({
  description,
  height,
  weight,
}: PokemonAboutProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>{description || <Skeleton count={2} />}</div>

      <div className={`${classes['characteristics']} grid grid-cols-2`}>
        <div className={classes['label']}>Height:</div>
        <div className="flex-grow">{height || <Skeleton width={32} />}</div>

        <div className={classes['label']}>Weight:</div>
        <div>{weight || <Skeleton width={32} />}</div>
      </div>
    </div>
  );
}

export default PokemonAbout;
