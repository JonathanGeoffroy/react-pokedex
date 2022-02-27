import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { PokemonChainEvolutionDTO } from './pokemon-evolution.dto';
import { PokemonEvolution } from './pokemon-evolution.model';
import { PokemonEvolutionService } from './pokemon-evolution.service';
import { PokemonSpecies } from './pokemon-species.model';

@Resolver(() => PokemonSpecies)
export class PokemonSpeciesResolver {
  constructor(
    private readonly pokemonEvolutionService: PokemonEvolutionService
  ) {}

  @ResolveField()
  async evolutions(
    @Parent() species: PokemonSpecies
  ): Promise<Partial<PokemonEvolution>[]> {
    const evolutions = await this.pokemonEvolutionService.findByUrl(
      species.dto.evolution_chain.url
    );

    return this.computeEvolutions(evolutions.chain);
  }

  private computeEvolutions(
    chain: PokemonChainEvolutionDTO
  ): Partial<PokemonEvolution>[] {
    const evolutions = this.toEvolutionArray(chain);

    const results: Partial<PokemonEvolution>[] = [];

    for (let i = 0; i < evolutions.length - 1; i++) {
      results.push({
        fromUrl: evolutions[i].pokemonUrl,
        toUrl: evolutions[i + 1].pokemonUrl,
        minLevel: evolutions[i + 1].minLevel,
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
      pokemonUrl: evolvesToSpecies.url,
    });

    return this.toEvolutionArray(evolvesTo.evolves_to[0], result);
  }
}

interface Evolution {
  minLevel?: number;
  pokemonUrl: string;
}
