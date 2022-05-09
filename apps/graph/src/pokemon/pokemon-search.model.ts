import { Field, ObjectType } from '@nestjs/graphql';
import { SearchPokemonDto } from '@react-pokedex/dto';
import { Pokemon } from './pokemon.model';

@ObjectType()
export class PokemonSearch {
  @Field(() => Pokemon)
  pokemon: Pokemon;

  dto: SearchPokemonDto;
}
