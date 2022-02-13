import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PokemonSpecies {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  description: string;
}
