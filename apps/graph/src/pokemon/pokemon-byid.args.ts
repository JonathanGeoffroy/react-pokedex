import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PokemonByIdArgs {
  @Field(() => Int)
  id: number;
}
