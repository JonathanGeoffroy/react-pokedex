import axios from 'axios';
import * as expectedFindAll from './pokemon_list.json';
import { bootstrap } from '../../src/server';
import { INestApplication } from '@nestjs/common';

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
        query:
          '{pokemon {details {id  order name types imageUrl height weight abilities}}}',
      })
      .then((actual) => expect(actual.data).toEqual(expectedFindAll));
  });

  it('should handle pagination', () => {
    return axios
      .post('http://localhost:3333/graphql', {
        query:
          '{pokemon(limit: 3, offset: 7) {details {id  order name types imageUrl height weight, abilities}}}',
      })
      .then((actual) =>
        expect(actual.data).toEqual({
          data: {
            pokemon: expectedFindAll.data.pokemon.slice(7, 7 + 3),
          },
        })
      );
  });
});
