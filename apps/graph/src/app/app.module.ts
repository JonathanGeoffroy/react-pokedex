import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    PokemonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      include: [PokemonModule],
      cache: new InMemoryLRUCache(),
    }),
  ],
})
export class AppModule {}
