import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { pokemonDetailsRoute } from '../../../../app/router';
import PokemonItemModel from '../../list/pokemon-item.model';
import pokeball from '../pokeball.svg';
import classes from './sibling-pokemon.module.scss';

export interface SiblingPokemonProps {
  pokemon?: PokemonItemModel | null;
}

export function SiblingPokemon({ pokemon }: SiblingPokemonProps) {
  if (pokemon === null) {
    return <div className="w-24 h-24" />;
  }
  return (
    <Link
      data-testid={`pokemon-sibling-${pokemon?.id || 'loading'}`}
      to={pokemon ? pokemonDetailsRoute(pokemon.id) : '#'}
      state={pokemon}
    >
      <img
        className={classNames('w-24 h-24', classes['sibling-pokemon'])}
        src={pokemon?.imageUrl || pokeball}
        alt={pokemon?.name || 'Loading'}
      />
    </Link>
  );
}

export default SiblingPokemon;
