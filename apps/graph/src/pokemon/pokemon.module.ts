import { Module } from '@nestjs/common';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { PokemonSpeciesResolver } from './pokemon-species.resolver';
import { PokemonSpeciesService } from './pokemon-species.service';
import { PokemonService } from './pokemon.service';
import { PokemonEvolutionResolver } from './pokemon-evolution.resolver';

@Module({
  providers: [
    PokemonResolver,
    PokemonEvolutionService,
    PokemonEvolutionResolver,
    PokemonSpeciesService,
    PokemonSpeciesResolver,
    PokemonService,
  ],
})
export class PokemonModule {}
