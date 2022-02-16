import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { idFromUrl } from '../utils/url';
import { PokemonChainEvolutionDTO } from './pokemon-evolution.dto';
import { PokemonEvolution } from './pokemon-evolution.model';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { Pokemon } from './pokemon-list.model';
import { PokemonSpecies } from './pokemon-species.model';

@Resolver(() => PokemonSpecies)
export class PokemonSpeciesResolver {
  constructor(
    private readonly pokemonEvolutionService: PokemonEvolutionService
  ) {}

  @ResolveField()
  async evolutions(
    @Parent() species: PokemonSpecies
  ): Promise<PokemonEvolution[]> {
    const evolutions = await this.pokemonEvolutionService.findByUrl(
      species.dto.evolution_chain.url
    );

    return this.computeEvolutions(evolutions.chain);
  }

  private computeEvolutions(
    chain: PokemonChainEvolutionDTO
  ): PokemonEvolution[] {
    const evolutions = this.toEvolutionArray(chain);

    const results: PokemonEvolution[] = [];

    for (let i = 0; i < evolutions.length - 1; i++) {
      results.push({
        from: evolutions[i].pokemon,
        minLevel: evolutions[i + 1].minLevel,
        to: evolutions[i + 1].pokemon,
      });
    }

    return results;
  }

  private toEvolutionArray(
    evolvesTo: PokemonChainEvolutionDTO,
    result: Evolution[] = []
  ): Evolution[] {
    if (!evolvesTo) {
      return result;
    }

    const evolvesToSpecies = evolvesTo.species;
    result.push({
      minLevel: evolvesTo.evolution_details?.length
        ? evolvesTo.evolution_details[0].min_level
        : null,
      pokemon: {
        id: idFromUrl(evolvesToSpecies.url),
        name: evolvesToSpecies.name,
      },
    });

    return this.toEvolutionArray(evolvesTo.evolves_to[0], result);
  }
}

interface Evolution {
  minLevel?: number;
  pokemon: Pokemon;
}
