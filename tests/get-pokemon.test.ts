import * as request from 'supertest';
import { buildApp } from '../src/app';

describe('test get pokemons info', () => {
  const app = buildApp();

  it('successful request with id', async () => {
    const successfulRequestWithId = await request(app).get('/pokemon/1');
    expect(successfulRequestWithId.status).toBe(200);
    expect(successfulRequestWithId.body).toStrictEqual({
      id: 1,
      name: 'bulbasaur',
      types: ['grass', 'poison'],
    });
  });

  it('another successful request with id', async () => {
    const anotherSuccessfulRequestWithId = await request(app).get('/pokemon/500');
    expect(anotherSuccessfulRequestWithId.status).toBe(200);
    expect(anotherSuccessfulRequestWithId.body).toStrictEqual({
      id: 500,
      name: 'emboar',
      types: ['fire', 'fighting'],
    });
  });

  it('successful request with name', async () => {
    const successfulRequestWithName = await request(app).get('/pokemon/pikachu');
    expect(successfulRequestWithName.status).toBe(200);
    expect(successfulRequestWithName.body).toStrictEqual({
      id: 25,
      name: 'pikachu',
      types: ['electric'],
    });
  });

  it('another successful request with name', async () => {
    const anotherSuccessfulRequestWithName = await request(app).get('/pokemon/lucario');
    expect(anotherSuccessfulRequestWithName.status).toBe(200);
    expect(anotherSuccessfulRequestWithName.body).toStrictEqual({
      id: 448,
      name: 'lucario',
      types: ['fighting', 'steel'],
    });
  });

  it('unsuccessful request with non-existent id', async () => {
    const unsuccessfulRequestWithId = await request(app).get('/pokemon/1234');
    expect(unsuccessfulRequestWithId.status).toBe(404);
    expect(unsuccessfulRequestWithId.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('another unsuccessful request with non-existent id', async () => {
    const anotherUnsuccessfulRequestWithId = await request(app).get('/pokemon/0');
    expect(anotherUnsuccessfulRequestWithId.status).toBe(404);
    expect(anotherUnsuccessfulRequestWithId.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('last unsuccessful request with non-existent id', async () => {
    const lastUnsuccessfulRequestWithId = await request(app).get('/pokemon/-1');
    expect(lastUnsuccessfulRequestWithId.status).toBe(404);
    expect(lastUnsuccessfulRequestWithId.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('unsuccessful request with non-existent name', async () => {
    const unsuccessfulRequestWithName = await request(app).get('/pokemon/pikacho');
    expect(unsuccessfulRequestWithName.status).toBe(404);
    expect(unsuccessfulRequestWithName.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('another unsuccessful request with non-existent name', async () => {
    const anotherUnsuccessfulRequestWithName = await request(app).get('/pokemon/charmannder');
    expect(anotherUnsuccessfulRequestWithName.status).toBe(404);
    expect(anotherUnsuccessfulRequestWithName.body).toStrictEqual({
      error: 'Not Found',
    });
  });
});
