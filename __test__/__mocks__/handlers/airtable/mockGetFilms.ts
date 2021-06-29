import { rest } from 'msw';
import { getFilmsResponse } from '__test__/__fixtures__/airtable/getFilmsResponse';

export const mockGetFilms = (films?: string[]) => {
  return {
    handler: rest.get(
      'https://api.airtable.com/v0/fake-db/films',
      (_, res, ctx) => {
        return res(
          ctx.status(200),

          ctx.json(getFilmsResponse(films))
        );
      }
    )
  };
};