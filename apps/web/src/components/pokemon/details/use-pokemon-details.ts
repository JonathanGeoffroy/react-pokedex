import { useMemo } from 'react';
import useRouterPartialCache from '../../../hooks/useRouterPartialCache';
import { PokemonType } from '../../../app/colors';
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
export default function usePokemonDetails(id: number): UsePokemonDetails {
  const { data, error } = usePokemonDetailsQuery({
    variables: { id },
  });
  const pokemon = useRouterPartialCache(data?.pokemonById);

  if (error) {
    throw error;
  }

  return useMemo<UsePokemonDetails>(() => {
    if (!pokemon) {
      return undefined;
    }

    const { id, name, height, weight, order, imageUrl, stats, types, species } =
      pokemon;

    return {
      id,
      name,
      height,
      weight,
      order,
      imageUrl,
      stats,
      types: types as PokemonType[],
      description: species?.description,
      evolutions:
        species?.evolutions?.map((evolution) => ({
          from: {
            id: evolution.from.id,
            name: evolution.from.name,
            imageUrl: evolution.from.details.imageUrl,
          },
          to: {
            id: evolution.to.id,
            name: evolution.to.name,
            imageUrl: evolution.to.details.imageUrl,
          },
          minLevel: evolution.minLevel || null,
        })) || [],
    };
  }, [pokemon]);
}