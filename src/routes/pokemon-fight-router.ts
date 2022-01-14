import * as express from 'express';
import { errorHandling } from '../schemas';
import { fightRequest } from '../services';

export const pokemonFightRouter = express.Router();

pokemonFightRouter.get('/:identifier1/fight/:identifier2', async (req: any, res: any) => {
  try {
    const fightData = await fightRequest(req.params.identifier1, req.params.identifier2);
    return res.status(200).send(fightData);
  } catch (error: any) {
    return errorHandling(res, error);
  }
});
