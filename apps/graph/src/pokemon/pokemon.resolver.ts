import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { PokemonByIdArgs } from './pokemon-byid.args';
import { PokemonDetailsDTO } from './pokemon-details.dto';
import { PokemonDetails, PokemonStat } from './pokemon-details.model';
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

  @Query(() => PokemonDetails)
  async pokemonById(@Args() args: PokemonByIdArgs): Promise<PokemonDetails> {
    return await this.handleDetails(args.id);
  }

  @ResolveField()
  async details(@Parent() pokemon: Pokemon): Promise<PokemonDetails> {
    return await this.handleDetails(pokemon.id);
  }

  private async handleDetails(id: number): Promise<PokemonDetails> {
    const dto = await this.pokemonService.findDetails(id);

    return {
      ...dto,
      types: dto.types.map(({ type }) => type.name),
      imageUrl: dto.sprites.other?.dream_world?.front_default || dto.sprites.front_default,
      abilities: dto.abilities.map(({ ability }) => ability.name),
      stats: this.toStats(dto),
    };
  }

  private toStats(dto: PokemonDetailsDTO): PokemonStat {
    return dto.stats.reduce((acc, stat) => {
      acc[this.toStatsKey(stat.stat.name)] = stat.base_stat;
      return acc;
    }, {} as PokemonStat);
  }

  private toStatsKey(key: string): keyof PokemonStat {
    switch (key) {
      case 'special-attack':
        return 'specialAttack';
      case 'special-defense':
        return 'specialDefense';
      default:
        return key as keyof PokemonStat;
    }
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
