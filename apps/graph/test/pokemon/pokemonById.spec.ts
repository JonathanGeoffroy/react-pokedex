import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../src/server';
import * as expectedDetails from './pokemon_details.json';
import * as expectedDetailsJA from './pokemon_details_ja.json';

describe('pokemonById query', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle non-number id error', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: `
        query pokemonDetails {
          pokemonById(id: hello) {
            id
          }
        }`,
      })
      .expect(400);
  });

  it('should handle unexisting id error', async () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: `
            query pokemonDetails {
              pokemonById(id: 0) {
                id
              }
            }`,
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchObject({
          errors: [
            {
              message: '404: Not Found',
            },
          ],
        });
      });
  });

  it('should handle correct query', () => {
    return request('http://localhost:3333/graphql')
      .post('')
      .send({
        query: `
          query pokemonDetails {
            pokemonById(id: 1) {
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
          }`,
      })
      .expect(200)
      .expect(expectedDetails);
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
            type
            name(lang: $lang)
          }
          imageUrl
        }
        query pokemonDetails($lang: Language) {
          pokemonById(id: 3, lang: $lang) {
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
      .expect(expectedDetailsJA);
  });
});
