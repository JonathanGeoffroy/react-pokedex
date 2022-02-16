import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pokemon } from './pokemon-list.model';

@ObjectType()
export class PokemonEvolution {
  @Field(() => Int, { nullable: true })
  minLevel?: number;

  @Field(() => Pokemon)
  from: Pokemon;

  @Field(() => Pokemon)
  to: Pokemon;
}
