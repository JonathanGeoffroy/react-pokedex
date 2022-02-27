import { PokemonTypeEnum } from '../../../__generated/pokeapi.graphql';

export default interface PokemonItemModel {
  id: string;
  name: string;
  order?: number | null;
  imageUrl: string;
  types: PokemonType[];
}

export interface PokemonType {
  name: string;
  type: PokemonTypeEnum;
}
