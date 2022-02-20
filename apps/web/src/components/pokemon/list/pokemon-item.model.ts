import { PokemonType } from '../../../app/colors';

export default interface PokemonItemModel {
  id: string;
  name: string;
  order?: number | null;
  imageUrl: string;
  types: PokemonType[];
}
