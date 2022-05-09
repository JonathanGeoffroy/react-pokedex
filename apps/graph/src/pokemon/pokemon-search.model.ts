import { Field, ObjectType } from '@nestjs/graphql';
import { PokemonSearchDTO } from './pokemon-search.dto';
import { Pokemon } from './pokemon.model';

@ObjectType()
export class PokemonSearch {
  @Field(() => Pokemon)
  pokemon: Pokemon;

  dto: PokemonSearchDTO;
}
