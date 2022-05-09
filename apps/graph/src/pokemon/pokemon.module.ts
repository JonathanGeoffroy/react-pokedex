import { Module } from '@nestjs/common';
import { PokemonResolver } from './pokemon.resolver';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { PokemonSpeciesResolver } from './pokemon-species.resolver';
import { PokemonSpeciesService } from './pokemon-species.service';
import { PokemonService } from './pokemon.service';
import { PokemonEvolutionResolver } from './pokemon-evolution.resolver';
import { PokemonTypeService } from './pokemon-type.service';
import { PokemonTypeResolver } from './pokemon-type.resolver';
import { PokemonSearchService } from './pokemon-search.service';
import { PokemonSearchResolver } from './pokemon-search.resolver';

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
    PokemonSearchService,
    PokemonSearchResolver,
  ],
})
export class PokemonModule {}
