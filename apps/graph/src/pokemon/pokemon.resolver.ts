import { Resolver, ResolveField, Parent, Args, Query } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-core';
import Language, { DEFAULT_LANGUAGE } from '../language/language';
import { PokemonByIdArgs } from './pokemon-byid.args';
import { Pokemon } from './pokemon.model';
import { PokemonListArgs } from './pokemon-list.args';
import { PokemonSpecies } from './pokemon-species.model';
import { PokemonSpeciesService } from './pokemon-species.service';
import toModel from './pokemon.mapper';
import { PokemonService } from './pokemon.service';

@Resolver(() => Pokemon)
export class PokemonResolver {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly pokemonSpeciesService: PokemonSpeciesService
  ) {}

  @Query(() => [Pokemon])
  async pokemon(@Args() args: PokemonListArgs): Promise<Partial<Pokemon>[]> {
    const dto = await this.pokemonService.list(args);

    return Promise.all(
      dto.results.map(({ url }) => this.handleDetails(this.idFromUrl(url)))
    );
  }

  @Query(() => Pokemon)
  async pokemonById(@Args() args: PokemonByIdArgs): Promise<Partial<Pokemon>> {
    return await this.handleDetails(args.id);
  }

  @ResolveField()
  async name(
    @Parent() details: Pokemon,
    @Args('lang', {
      type: () => Language,
      nullable: true,
      defaultValue: DEFAULT_LANGUAGE,
    })
    lang: Language
  ) {
    const species = await this.pokemonSpeciesService.findById(details.id);
    return species.names.find((nameEntry) => nameEntry.language.name === lang)
      .name;
  }

  @ResolveField()
  async species(@Parent() details: Pokemon): Promise<PokemonSpecies> {
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
  async previous(@Parent() details: Pokemon): Promise<Partial<Pokemon>> {
    return this.maybePokemon(details.id - 1);
  }

  @ResolveField()
  async next(@Parent() details: Pokemon): Promise<Partial<Pokemon>> {
    return this.maybePokemon(details.id + 1);
  }

  private maybePokemon(id: number): Promise<Partial<Pokemon>> {
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

  private async handleDetails(id: number): Promise<Partial<Pokemon>> {
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
