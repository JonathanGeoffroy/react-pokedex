import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { PokemonDetails } from './pokemon-details.model';
import { PokemonSpecies } from './pokemon-species.model';
import { PokemonSpeciesService } from './pokemon-species.service';

@Resolver(() => PokemonDetails)
export class PokemonDetailsResolver {
  constructor(private readonly pokemonSpeciesService: PokemonSpeciesService) {}

  @ResolveField()
  async species(@Parent() details: PokemonDetails): Promise<PokemonSpecies> {
    const species = await this.pokemonSpeciesService.findById(details.id);

    const rawDescription = species.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    ).flavor_text;

    const description = this.sanitize(rawDescription);

    return {
      id: species.id,
      description,
    };
  }

  private sanitize(description: string): string {
    return description.replace(/[\n\r\t\f]/g, ' ');
  }
}
