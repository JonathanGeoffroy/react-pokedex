import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { InMemoryLRUCache } from 'apollo-server-caching';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PokemonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './apps/graph/src/schema.gql'),
      include: [PokemonModule],
      cache: new InMemoryLRUCache(),
    }),
  ],
})
export class AppModule {}
