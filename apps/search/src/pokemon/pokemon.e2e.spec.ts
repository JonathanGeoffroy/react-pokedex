import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import mongoose from 'mongoose';
import { searchPokemonDataset } from '@react-pokedex/dto';
import {
  closeInMongodConnection,
  mongod,
  rootMongooseTestModule,
} from '../test-utils/mongo/MongooseTestModule';
import { PokemonModule } from './pokemon.module';
import { PokemonSchema } from './pokemon.model';

describe('Pokemon', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), PokemonModule],
    }).compile();

    await mongoose.connect(mongod.getUri(), {});
    await mongoose.connection.db.dropDatabase();
    const pokemonModel = mongoose.model('pokemons', PokemonSchema);
    await pokemonModel.insertMany(searchPokemonDataset);

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET pokemon should find pokemon by exact name`, () => {
    return request(app.getHttpServer())
      .get('/pokemon?term=Bulbasaur')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Bulbasaur',
          lang: 'en',
        },
      ]);
  });

  it(`/GET pokemon should find pokemon by partial name`, () => {
    return request(app.getHttpServer())
      .get('/pokemon?term=saur')
      .expect(200)
      .expect([
        { id: 1, name: 'Bulbasaur', lang: 'en' },
        { id: 2, name: 'Ivysaur', lang: 'en' },
        { id: 3, name: 'Venusaur', lang: 'en' },
      ]);
  });

  it(`/GET pokemon should return empty array`, () => {
    return request(app.getHttpServer())
      .get('/pokemon?term=NotExisting')
      .expect(200)
      .expect([]);
  });

  it(`/GET pokemon should not accept searching without any term`, () => {
    return request(app.getHttpServer()).get('/pokemon').expect(400);
  });

  it(`/GET pokemon should handle language`, () => {
    return request(app.getHttpServer())
      .get('/pokemon?term=Bulbizarre&lang=fr')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Bulbizarre',
          lang: 'fr',
        },
      ]);
  });

  it(`/GET pokemon should refuse unavailable language`, () => {
    return request(app.getHttpServer())
      .get('/pokemon?term=Bulbizarre&lang=ja')
      .expect(400);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
