import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap } from '../../src/server';
import { server } from '../mocks/server';
import * as expectedSearchBulbasaur from './search_bulbasaur.json';
describe('pokemon query', () => {
  let app: INestApplication;
  beforeAll(async () => {
    server.listen({ onUnhandledRequest: 'bypass' });
    app = await bootstrap();
  });

  afterEach(() => server.resetHandlers());

  afterAll(async () => {
    await app.close();
    server.close();
  });

  test('fake', () => {
    return request('http://localhost:3333/graphql')
      .post('/')
      .send({
        query: `
          query search($term: String!, $lang: Language) {
            searchPokemon(term: $term, lang: $lang) {
              pokemon {
                id
                order
                name(lang: $lang)
                types {
                  type
                  name(lang: $lang)
                }
                stats {
                  hp
                  attack
                }
              }
            }
          }     
        `,
        variables: {
          term: 'Bulbasaur',
        },
      })
      .expect(200)
      .expect(expectedSearchBulbasaur);
  });
});
