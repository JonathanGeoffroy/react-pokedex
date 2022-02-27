import { Field, ObjectType } from '@nestjs/graphql';
import { PokemonTypeDTO } from './pokemon-type.dto';
import PokemonTypeEnum from './pokemon-type.enum';

@ObjectType()
export class PokemonType {
  dto: PokemonTypeDTO;
  
  @Field(() => PokemonTypeEnum)
  type: PokemonTypeEnum;

  @Field(() => String)
  name: string;
}
