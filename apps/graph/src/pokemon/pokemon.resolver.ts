import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { PokemonByIdArgs } from './pokemon-byid.args';
import { PokemonDetailsDTO } from './pokemon-details.dto';
import { PokemonDetails, PokemonStat } from './pokemon-details.model';
import { PokemonListArgs } from './pokemon-list.args';
import { Pokemon } from './pokemon-list.model';
import toModel from './pokemon.mapper';
import { PokemonService } from './pokemon.service';

@Resolver(() => Pokemon)
export class PokemonResolver {
  constructor(private readonly pokemonService: PokemonService) {}

  @Query(() => [Pokemon])
  async pokemon(@Args() args: PokemonListArgs): Promise<Pokemon[]> {
    const dto = await this.pokemonService.list(args);

    const result: Pokemon[] = dto.results.map((dto) => ({
      id: this.idFromUrl(dto.url),
      name: dto.name,
    }));

    return result;
  }

  @Query(() => PokemonDetails)
  async pokemonById(
    @Args() args: PokemonByIdArgs
  ): Promise<Partial<PokemonDetails>> {
    return await this.handleDetails(args.id);
  }

  @ResolveField()
  async details(@Parent() pokemon: Pokemon): Promise<Partial<PokemonDetails>> {
    return await this.handleDetails(pokemon.id);
  }

  private async handleDetails(id: number): Promise<Partial<PokemonDetails>> {
    const dto = await this.pokemonService.findDetails(id);
    return toModel(dto);
  }

  private idFromUrl(url: string): number {
    const matcher = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]+)\//g.exec(
      url
    );

    if (!matcher || matcher[1] === undefined) {
      throw new Error('Unparsable id');
    }
    return parseInt(matcher[1]);
  }
}
