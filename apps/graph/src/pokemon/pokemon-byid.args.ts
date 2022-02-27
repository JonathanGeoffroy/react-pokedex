import { ArgsType, Field, ID } from '@nestjs/graphql';
import Language, { DEFAULT_LANGUAGE } from '../language/language';

@ArgsType()
export class PokemonByIdArgs {
  @Field(() => ID)
  id: number;

  @Field(() => Language, { nullable: true })
  lang: Language = DEFAULT_LANGUAGE;
}
