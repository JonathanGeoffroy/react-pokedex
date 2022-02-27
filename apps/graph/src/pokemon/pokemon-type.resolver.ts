import { Resolver, ResolveField, Parent, Args } from '@nestjs/graphql';
import Language, { DEFAULT_LANGUAGE } from '../language/language';
import PokemonTypeEnum from './pokemon-type.enum';
import { PokemonType } from './pokemon-type.model';

@Resolver(() => PokemonType)
export class PokemonTypeResolver {
  @ResolveField(() => String)
  name(
    @Parent() pokemonType: PokemonType,
    @Args('lang', {
      type: () => Language,
      nullable: true,
      defaultValue: DEFAULT_LANGUAGE,
    })
    lang: Language
  ): string {
    return pokemonType.dto.names.find(({ language }) => language.name === lang)
      .name;
  }

  @ResolveField(() => String, { name: 'type' })
  type(@Parent() pokemonType: PokemonType): PokemonTypeEnum {
    return PokemonTypeEnum[pokemonType.dto.name];
  }
}
