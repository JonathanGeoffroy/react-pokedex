import { ArgsType, Field, Int } from '@nestjs/graphql';
import Language, { DEFAULT_LANGUAGE } from '../language/language';



@ArgsType()
export class PokemonListArgs {
  @Field(() => Int, { nullable: true })
  limit: number;

  @Field(() => Int, { nullable: true })
  offset: number;

  @Field(() => Language, { nullable: true })
  lang: Language = DEFAULT_LANGUAGE;
}
