export interface PokemonDetailsDTO {
  id: number;
  name: string;
  order: number;
  sprites: {
    front_default: string;
    other?: {
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: PokemonTypeDTO[];
  height: number;
  weight: number;
  abilities: PokemonAbilityDTO[];
  stats: PokemonStatsDTO[];
}

export interface PokemonTypeDTO {
  slots: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbilityDTO {
  ability: {
    name: string;
  };
}

export interface PokemonStatsDTO {
  base_stat: number;
  stat: {
    name: string;
  };
}
