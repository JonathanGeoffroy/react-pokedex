import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import { PokemonDetails } from './pokemon-details.model';
import { PokemonSpecies } from './pokemon-species.model';
import { PokemonSpeciesService } from './pokemon-species.service';
import toModel from './pokemon.mapper';
import { PokemonService } from './pokemon.service';

@Resolver(() => PokemonDetails)
export class PokemonDetailsResolver {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly pokemonSpeciesService: PokemonSpeciesService
  ) {}

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
      dto: species,
    };
  }

  private sanitize(description: string): string {
    return description.replace(/[\n\r\t\f]/g, ' ');
  }

  @ResolveField()
  async previous(
    @Parent() details: PokemonDetails
  ): Promise<Partial<PokemonDetails>> {
    return this.maybePokemon(details.id - 1);
  }

  @ResolveField()
  async next(
    @Parent() details: PokemonDetails
  ): Promise<Partial<PokemonDetails>> {
    return this.maybePokemon(details.id + 1);
  }

  private maybePokemon(id: number): Promise<Partial<PokemonDetails>> {
    return this.pokemonService
      .findDetails(id)
      .then(toModel)
      .catch((err: ApolloError) => {
        if (err.extensions.response.status === 404) {
          return null;
        }
        throw err;
      });
  }
}
