import { buildApp } from './app';

const app = buildApp();

app.listen(8080, () => {
  console.log('Server listening on 8080');
});
