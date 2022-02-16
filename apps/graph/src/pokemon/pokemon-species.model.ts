import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PokemonEvolution } from './pokemon-evolution.model';
import { PokemonSpeciesDTO } from './pokemon-species.dto';

@ObjectType()
export class PokemonSpecies {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  description: string;

  @Field(() => [PokemonEvolution], { nullable: true })
  evolutions?: PokemonEvolution[];

  dto: PokemonSpeciesDTO;
}
