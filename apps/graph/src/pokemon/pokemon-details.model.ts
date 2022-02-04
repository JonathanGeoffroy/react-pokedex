import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PokemonStat {
  @Field(() => Number)
  hp: number;

  @Field(() => Number)
  attack: number;

  @Field(() => Number)
  defense: number;

  @Field(() => Number)
  specialAttack: number;

  @Field(() => Number)
  specialDefense: number;

  @Field(() => Number)
  speed: number;
}

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
  abilities: string[];

  @Field(() => PokemonStat)
  stats: PokemonStat;
}
