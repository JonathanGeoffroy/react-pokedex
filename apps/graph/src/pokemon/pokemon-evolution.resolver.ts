import { Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { idFromUrl } from '../utils/url';
import { PokemonEvolution } from './pokemon-evolution.model';
import toModel from './pokemon.mapper';
import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon.service';

@Resolver(() => PokemonEvolution)
export class PokemonEvolutionResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @ResolveField()
  async from(
    @Parent() pokemonEvolution: PokemonEvolution
  ): Promise<Partial<Pokemon>> {
    return this.handleDetails(pokemonEvolution.fromUrl);
  }

  @ResolveField()
  async to(
    @Parent() pokemonEvolution: PokemonEvolution
  ): Promise<Partial<Pokemon>> {
    return this.handleDetails(pokemonEvolution.toUrl);
  }

  private async handleDetails(url: string) {
    const dto = await this.pokemonService.findDetails(idFromUrl(url));

    return toModel(dto);
  }
}
