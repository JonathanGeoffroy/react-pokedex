import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../src/server';
import * as expectedSpecies from './pokemon_species.json';

describe('species', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle evolution', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: `
        fragment Evolution on Pokemon {
          id
          name
          order
          types { type name }
          imageUrl
        }
        query pokemonDetails {
          pokemonById(id: 1) {
            id
            name
            species {
              evolutions {
                minLevel
                from {
                  ...Evolution
                }
                to {
                  ...Evolution
                }
              }
            }
          }
        }`,
      })
      .expect(200)
      .expect(expectedSpecies);
  });
});
