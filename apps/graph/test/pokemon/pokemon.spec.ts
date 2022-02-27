import axios from 'axios';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../src/server';
import * as expectedFindAll from './pokemon_list.json';

describe('pokemon query', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle no query error', () => {
    return expect(
      axios.post('http://localhost:3333/graphql', {
        query: '{}',
      })
    ).rejects.toMatchObject({ response: { status: 400 } });
  });
  it('should handle correct query', () => {
    return axios
      .post('http://localhost:3333/graphql', {
        query: `
        query pokemonList {
          pokemon(limit: 20, offset: 0) {
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
        }
        `,
      })
      .then((actual) => expect(actual.data).toEqual(expectedFindAll));
  });

  it('should handle pagination', () => {
    return axios
      .post('http://localhost:3333/graphql', {
        query: `
        query pokemonList {
          pokemon(limit: 3, offset: 7) {
            id
            order
            name
            types
          }
        }`,
      })
      .then((actual) =>
        expect(actual.data).toEqual({
          data: {
            pokemon: expectedFindAll.data.pokemon
              .slice(7, 7 + 3)
              .map(({ id, order, name, types }) => ({
                id,
                order,
                name,
                types,
              })),
          },
        })
      );
  });
});
