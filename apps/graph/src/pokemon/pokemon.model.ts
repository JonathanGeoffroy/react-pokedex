import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PokemonDetailsDTO } from './pokemon-details.dto';
import { PokemonSpecies } from './pokemon-species.model';
import { PokemonType } from './pokemon-type.model';

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
export class Pokemon {
  @Field(() => ID)
  id: number;

  @Field(() => Number)
  order: number;

  @Field()
  name: string;

  @Field(() => [PokemonType])
  types: PokemonType[];

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

  @Field(() => PokemonSpecies)
  species: PokemonSpecies;

  @Field(() => Pokemon, { nullable: true })
  previous: Pokemon;

  @Field(() => Pokemon, { nullable: true })
  next: Pokemon;

  dto: PokemonDetailsDTO;
}
