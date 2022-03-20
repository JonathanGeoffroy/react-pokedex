import { useContext, useMemo } from 'react';
import { LanguageContext } from '../../../app/language-provider';
import useRouterPartialCache from '../../../hooks/useRouterPartialCache';
import { usePokemonDetailsQuery } from '../../../__generated/pokeapi.graphql';
import PokemonItemModel from '../list/pokemon-item.model';

export interface PokemonDetailsModel extends PokemonItemModel {
  height: number;
  weight: number;
  description: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  evolutions: Evolution[];
  previous?: PokemonItemModel | null;
  next?: PokemonItemModel | null;
}

export interface PokemonEvolution {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Evolution {
  minLevel?: number | null;
  from: PokemonEvolution;
  to: PokemonEvolution;
}

type UsePokemonDetails = Partial<PokemonDetailsModel> | undefined;
export default function usePokemonDetails(id: string): UsePokemonDetails {
  const [lang] = useContext(LanguageContext);
  const { data, error } = usePokemonDetailsQuery({
    variables: { id, lang },
  });
  const pokemon = useRouterPartialCache(data?.pokemonById);

  if (error) {
    throw error;
  }

  return useMemo<UsePokemonDetails>(() => {
    if (!pokemon) {
      return undefined;
    }

    const {
      id,
      name,
      height,
      weight,
      order,
      imageUrl,
      stats,
      types,
      species,
      next,
      previous,
    } = pokemon;

    return {
      id,
      name,
      height,
      weight,
      order,
      imageUrl,
      stats,
      types,
      description: species?.description,
      evolutions:
        species?.evolutions?.map((evolution) => ({
          from: evolution.from,
          to: evolution.to,
          minLevel: evolution.minLevel || null,
        })) || [],
      previous,
      next,
    };
  }, [pokemon]);
}
