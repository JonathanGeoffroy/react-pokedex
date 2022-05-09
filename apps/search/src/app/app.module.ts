import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from '../configuration/Mongo.config';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfig,
    }),
    PokemonModule,
  ],
})
export class AppModule {}
