import { ArgsType, Field } from '@nestjs/graphql';
import Language, { DEFAULT_LANGUAGE } from '../language/language';

@ArgsType()
export class PokemonSearchArgs {
  @Field(() => String, { nullable: false })
  term: string;

  @Field(() => Language, { nullable: true })
  lang: Language = DEFAULT_LANGUAGE;
}
