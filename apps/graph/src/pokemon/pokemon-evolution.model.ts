import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pokemon } from './pokemon.model';

@ObjectType()
export class PokemonEvolution {
  @Field(() => Int, { nullable: true })
  minLevel?: number;

  @Field(() => Pokemon)
  from: Partial<Pokemon>;

  fromUrl: string;

  @Field(() => Pokemon)
  to: Partial<Pokemon>;

  toUrl: string;
}
