import { rest } from 'msw';
import pokemonDataset from './pokemon.dataset';

export const handlers = [
  rest.get('http://localhost:3000/api/pokemon', (req, res, ctx) => {
    const term = req.url.searchParams.get('term');
    const language = req.url.searchParams.get('lang') || 'en';

    return res(
      ctx.json(
        pokemonDataset.filter(
          ({ name, lang }) => lang == language && name.includes(term)
        )
      )
    );
  }),
];
