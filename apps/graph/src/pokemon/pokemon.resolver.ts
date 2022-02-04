import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { PokemonDetails } from './pokemon-details.model';
import { PokemonListArgs } from './pokemon-list.args';
import { Pokemon } from './pokemon-list.model';
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

  @ResolveField()
  async details(@Parent() pokemon: Pokemon): Promise<PokemonDetails> {
    const dto = await this.pokemonService.findDetails(pokemon.id);

    return {
      ...dto,
      types: dto.types.map(({ type }) => type.name),
      imageUrl: dto.sprites.back_default,
      abilities: dto.abilities.map(({ ability }) => ability.name),
    };
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
