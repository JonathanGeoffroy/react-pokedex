import axios from 'axios';
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
    return axios
      .post('http://localhost:3333/graphql', {
        query: `
        fragment Evolution on Pokemon {
          id
          name
          details {
            order
            types
            imageUrl
          }
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
      .then((actual) => expect(actual.data).toEqual(expectedSpecies));
  });
});
