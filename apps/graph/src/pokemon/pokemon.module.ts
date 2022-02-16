import { Module } from '@nestjs/common';
import { PokemonDetailsResolver } from './pokemon-details.resolver';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { PokemonSpeciesResolver } from './pokemon-species.resolver';
import { PokemonSpeciesService } from './pokemon-species.service';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonService } from './pokemon.service';

@Module({
  providers: [
    PokemonDetailsResolver,
    PokemonSpeciesService,
    PokemonSpeciesResolver,
    PokemonResolver,
    PokemonService,
    PokemonEvolutionService,
  ],
})
export class PokemonModule {}
