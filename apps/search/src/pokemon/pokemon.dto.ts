import { Exclude, Expose } from 'class-transformer';
import { Language } from '../enum/language';

@Exclude()
export class PokemonDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  lang: Language;
}
