import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../src/server';
import * as expectedFindAll from './pokemon_list.json';
import * as expectedFindAllJA from './pokemon_list_ja.json';
describe('pokemon query', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle no query error', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: '{}',
      })
      .expect(400);
  });
  it('should handle correct query', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: `
        query pokemonList {
          pokemon(limit: 20, offset: 0) {
            id
            order
            name
            types { type name }
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
      .expect(200)
      .expect(expectedFindAll);
  });

  it('should handle pagination', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: `
        query pokemonList {
          pokemon(limit: 3, offset: 7) {
            id
            order
            name
            types {type name}
          }
        }`,
      })
      .expect(200)
      .expect({
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
      });
  });

  it('should handle translation', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        variables: { lang: 'ja' },
        query: `
        fragment PokemonFragment on Pokemon {
          id
          name(lang: $lang)
          order
          types {
            type,
            name(lang:$lang)
          }
          imageUrl
        }
        query pokemonList($lang: Language) {
          pokemon(limit: 5, lang: $lang) {
            ...PokemonFragment
            height 
            weight
            abilities
            stats {
              hp
              attack
              defense
              specialAttack
              specialDefense
              speed
            }
            species {
              description(lang: $lang)
              evolutions {
                minLevel
                from {
                  ...PokemonFragment
                }
                to {
                  ...PokemonFragment
                }
              }
            }
            previous {
              ...PokemonFragment
            }
            next {
              ...PokemonFragment
            }
          }
        }`,
      })
      .expect(200)
      .expect(expectedFindAllJA);
  });
});
