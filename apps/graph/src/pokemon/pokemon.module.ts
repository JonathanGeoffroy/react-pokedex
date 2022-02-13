import { Module } from '@nestjs/common';
import { PokemonDetailsResolver } from './pokemon-details.resolver';
import { PokemonSpeciesService } from './pokemon-species.service';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [
    PokemonDetailsResolver,
    PokemonSpeciesService,
    PokemonResolver,
    PokemonService,
  ],
})
export class PokemonModule {}
