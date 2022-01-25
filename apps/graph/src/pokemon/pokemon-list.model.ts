import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PokemonDetails } from './pokemon-details.model';

@ObjectType()
export class Pokemon {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  details?: PokemonDetails;
}
