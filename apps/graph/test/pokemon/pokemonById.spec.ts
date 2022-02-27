import axios from 'axios';
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
      .then((actual) => expect(actual.data).toEqual(expectedDetails));
  });

  it('should handle translation', () => {
    return axios
      .post('http://localhost:3333/graphql', {
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
      .then((actual) => expect(actual.data).toEqual(expectedDetailsJA));
  });
});
