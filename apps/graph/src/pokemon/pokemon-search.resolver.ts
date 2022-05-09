import { Resolver, ResolveField, Parent, Args, Query } from '@nestjs/graphql';
import { Pokemon } from './pokemon.model';
import { PokemonService } from './pokemon.service';
import { PokemonSearch } from './pokemon-search.model';
import { PokemonSearchArgs } from './pokemon-search.args';
import { PokemonSearchService } from './pokemon-search.service';
import toModel from './pokemon.mapper';

@Resolver(() => PokemonSearch)
export class PokemonSearchResolver {
  constructor(
    private readonly searchService: PokemonSearchService,
    private readonly pokemonService: PokemonService
  ) {}

  @Query(() => [PokemonSearch])
  async searchPokemon(
    @Args() args: PokemonSearchArgs
  ): Promise<Partial<PokemonSearch>[]> {
    const results = await this.searchService.search(args.term, args.lang);

    return results.map((dto) => ({
      dto,
    }));
  }

  @ResolveField()
  async pokemon(
    @Parent() pokemonSearch: PokemonSearch
  ): Promise<Partial<Pokemon>> {
    const dto = await this.pokemonService.findDetails(pokemonSearch.dto.id);
    return toModel(dto);
  }
}
