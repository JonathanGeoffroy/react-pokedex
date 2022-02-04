import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PokemonDetails {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  order: number;

  @Field()
  name: string;

  @Field(() => [String])
  types: string[];

  @Field(() => String)
  imageUrl: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  weight: number;

  @Field(() => [String])
  abilities: string[]
}
