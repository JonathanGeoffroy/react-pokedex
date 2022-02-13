import axios from 'axios';
import * as expectedDetails from './pokemon_details.json';
import { bootstrap } from '../../src/server';
import { INestApplication } from '@nestjs/common';

describe('pokemonById query', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle non-number id error', () => {
    return expect(
      axios.post('http://localhost:3333/graphql', {
        query: `
        query pokemonDetails {
          pokemonById(id: hello) {
            id
          }
        }`,
      })
    ).rejects.toMatchObject({ response: { status: 400 } });
  });

  it('should handle unexisting id error', async () => {
    return expect(
      axios.post('http://localhost:3333/graphql', {
        query: `
      query pokemonDetails {
        pokemonById(id: 0) {
          id
        }
      }`,
      })
    ).resolves.toMatchObject({
      data: {
        errors: [
          {
            message: '404: Not Found',
          },
        ],
      },
    });
  });

  it('should handle correct query', () => {
    return axios
      .post('http://localhost:3333/graphql', {
        query: `
        query pokemonDetails {
          pokemonById(id: 1) {
            id
            order
            name
            types
            imageUrl
            height
            weight
            abilities
            species {
              id
              description
            }
            stats {
              hp
              attack
              defense
              specialAttack
              specialDefense
              speed
            }
          }
        }`,
      })
      .then((actual) => expect(actual.data).toEqual(expectedDetails));
  });
});
