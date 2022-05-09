import { rest } from 'msw';
import { searchPokemonDataset } from '@react-pokedex/dto';

export const handlers = [
  rest.get(`${process.env.SEARCH_API}/api/pokemon`, (req, res, ctx) => {
    const term = req.url.searchParams.get('term');
    const language = req.url.searchParams.get('lang') || 'en';

    return res(
      ctx.json(
        searchPokemonDataset.filter(
          ({ name, lang }) => lang == language && name.includes(term)
        )
      )
    );
  }),
];
