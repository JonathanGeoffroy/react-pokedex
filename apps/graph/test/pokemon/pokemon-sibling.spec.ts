import axios from 'axios';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../src/server';
import * as expectedFindAll from './pokemon_list.json';

const siblingQuery = (id: number) => `
fragment PokemonFragment on PokemonDetails {
  id
  name
  order
  types
  imageUrl
}
query pokemonDetails {
  pokemonById(id:${id}) {
    id
    name
    previous {
      ...PokemonFragment
    }
    next {
      ...PokemonFragment
    }
  }
}
`;

describe('pokemon siblings query', () => {
  let app: INestApplication;
  beforeAll(async () => {
    app = await bootstrap();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should handle pokemon with no previous', () => {
    const first = getAt(0);
    const second = getAt(1);

    const expected = {
      data: {
        pokemonById: {
          id: first.id,
          name: first.name,
          previous: null,
          next: {
            id: second.id,
            name: second.name,
            order: second.order,
            types: second.types,
            imageUrl: second.imageUrl,
          },
        },
      },
    };

    return axios
      .post('http://localhost:3333/graphql', {
        query: siblingQuery(1),
      })
      .then((actual) => expect(actual.data).toEqual(expected));
  });

  it('should handle pokemon with both previous and next ', () => {
    const first = getAt(0);
    const second = getAt(1);
    const third = getAt(2);

    const expected = {
      data: {
        pokemonById: {
          id: second.id,
          name: second.name,
          previous: {
            id: first.id,
            name: first.name,
            order: first.order,
            types: first.types,
            imageUrl: first.imageUrl,
          },
          next: {
            id: third.id,
            name: third.name,
            order: third.order,
            types: third.types,
            imageUrl: third.imageUrl,
          },
        },
      },
    };

    return axios
      .post('http://localhost:3333/graphql', {
        query: siblingQuery(2),
      })
      .then((actual) => expect(actual.data).toEqual(expected));
  });
});
function getAt(index: number) {
  return expectedFindAll.data.pokemon[index].details;
}
