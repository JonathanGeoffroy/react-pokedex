import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { join } from 'path';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    PokemonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, '../__generated/schema.gql'),
      include: [PokemonModule],
      cache: new InMemoryLRUCache(),
    }),
  ],
})
export class AppModule {}
