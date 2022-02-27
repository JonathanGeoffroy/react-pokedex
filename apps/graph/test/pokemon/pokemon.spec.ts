import axios from 'axios';
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
            types {type name}
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
              description
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
      .then((actual) => expect(actual.data).toEqual(expectedFindAllJA));
  });
});
