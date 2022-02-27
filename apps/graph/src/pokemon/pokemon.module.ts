import { Module } from '@nestjs/common';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { PokemonSpeciesResolver } from './pokemon-species.resolver';
import { PokemonSpeciesService } from './pokemon-species.service';
import { PokemonService } from './pokemon.service';
import { PokemonEvolutionResolver } from './pokemon-evolution.resolver';
import { PokemonTypeService } from './pokemon-type.service';
import { PokemonTypeResolver } from './pokemon-type.resolver';

@Module({
  providers: [
    PokemonResolver,
    PokemonEvolutionService,
    PokemonEvolutionResolver,
    PokemonSpeciesService,
    PokemonSpeciesResolver,
    PokemonService,
    PokemonTypeService,
    PokemonTypeResolver,
  ],
})
export class PokemonModule {}
