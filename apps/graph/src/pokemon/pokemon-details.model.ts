import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PokemonDetails {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => [String])
  types: string[];

  @Field(() => String)
  imageUrl: string;
}
