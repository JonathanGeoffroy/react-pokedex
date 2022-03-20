import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { pokemonDetailsRoute } from '../../../../app/router';
import PokeballLoader from '../../../pokeball-loader/pokeball-loader';
import PokemonItemModel from '../../list/pokemon-item.model';
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
      className={classNames('w-24 h-24', classes['sibling-pokemon'])}
    >
      {pokemon ? (
        <img src={pokemon?.imageUrl} alt={pokemon?.name} />
      ) : (
        <PokeballLoader />
      )}
    </Link>
  );
}

export default SiblingPokemon;
