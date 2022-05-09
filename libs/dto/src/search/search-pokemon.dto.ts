import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Language } from '../enum/language';

@Exclude()
export class SearchPokemonDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty({ enum: Language })
  @Expose()
  lang: Language;
}
