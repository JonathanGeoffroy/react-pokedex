import { useMemo } from 'react';
import { usePokemonDetailsQuery } from '../../../__generated/pokeapi.graphql';

export interface Pokemon {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PokemonDetails extends Pokemon {
  order: number;
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
  types: string[];
  evolutions: Evolution[];
}

export interface Evolution {
  minLevel?: number | null;
  from: Pokemon;
  to: Pokemon;
}

export default function usePokemonDetails(
  id: number
): PokemonDetails | undefined {
  const { data, error } = usePokemonDetailsQuery({
    variables: { id },
  });

  if (error) {
    throw error;
  }

  return useMemo<PokemonDetails | undefined>(() => {
    if (!data) {
      return undefined;
    }

    const { id, name, height, weight, order, imageUrl, stats, types, species } =
      data.pokemonById;

    return {
      id,
      name,
      height,
      weight,
      order,
      imageUrl,
      stats,
      types,
      description: species.description,
      evolutions:
        species.evolutions?.map((evolution) => ({
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
  }, [data]);
}
