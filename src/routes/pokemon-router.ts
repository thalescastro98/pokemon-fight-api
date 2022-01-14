import * as express from 'express';
import { errorHandling } from '../schemas';
import { pokemonRequest } from '../services';

export const pokemonRouter = express.Router();

pokemonRouter.get('/:identifier', async (req: any, res: any) => {
  try {
    const pokemonData = await pokemonRequest(req.params.identifier);
    return res.status(200).send(pokemonData);
  } catch (error: any) {
    return errorHandling(res, error);
  }
});
