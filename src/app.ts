import * as express from 'express';
import { pokemonFightRouter, pokemonRouter } from './routes';

export const buildApp = () => {
  const app = express();

  app.use('/pokemon', pokemonRouter);

  app.use('/pokemon', pokemonFightRouter);

  return app;
};
