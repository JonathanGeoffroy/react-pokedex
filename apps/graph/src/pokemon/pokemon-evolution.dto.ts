import { PokemonDTO } from './pokemon-list.dto';

export interface PokemonEvolutionDTO {
  id: number;
  chain: PokemonChainEvolutionDTO;
}

export interface EvolutionDetailsDTO {
  min_level?: number;
}

export interface PokemonChainEvolutionDTO {
  evolution_details: EvolutionDetailsDTO[];
  evolves_to?: PokemonChainEvolutionDTO[];
  species: PokemonDTO;
}

export interface EvolutionDTO {
  species: PokemonDTO;
  evolves_to?: PokemonEvolutionDTO[];
}
