import * as request from 'supertest';
import { buildApp } from '../src/app';

describe('test get pokemons info', () => {
  const app = buildApp();

  const sortMove = (move1: { name: string; type: string }, move2: { name: string; type: string }) => {
    if (move1.name < move2.name) return -1;
    return 1;
  };

  it('successful fight with ids', async () => {
    const successfulFightWithIds = await request(app).get('/pokemon/65/fight/832');
    expect(successfulFightWithIds.status).toBe(200);
    expect(successfulFightWithIds.body).toHaveProperty('attacker');
    expect(successfulFightWithIds.body).toHaveProperty('defender');
    expect(successfulFightWithIds.body).toHaveProperty('moves');
    expect(successfulFightWithIds.body.attacker).toBe('alakazam');
    expect(successfulFightWithIds.body.defender).toBe('dubwool');
    expect(successfulFightWithIds.body.moves.sort(sortMove)).toStrictEqual(
      [
        {
          name: 'counter',
          type: 'fighting',
        },
        {
          name: 'submission',
          type: 'fighting',
        },
        {
          name: 'seismic-toss',
          type: 'fighting',
        },
        {
          name: 'dynamic-punch',
          type: 'fighting',
        },
        {
          name: 'focus-blast',
          type: 'fighting',
        },
        {
          name: 'focus-punch',
          type: 'fighting',
        },
        {
          name: 'drain-punch',
          type: 'fighting',
        },
      ].sort(sortMove),
    );
  });

  it('successful fight with id and name', async () => {
    const successfulFightWithIdAndName = await request(app).get('/pokemon/275/fight/simipour');
    expect(successfulFightWithIdAndName.status).toBe(200);
    expect(successfulFightWithIdAndName.body).toHaveProperty('attacker');
    expect(successfulFightWithIdAndName.body).toHaveProperty('defender');
    expect(successfulFightWithIdAndName.body).toHaveProperty('moves');
    expect(successfulFightWithIdAndName.body.attacker).toBe('shiftry');
    expect(successfulFightWithIdAndName.body.defender).toBe('simipour');
    expect(successfulFightWithIdAndName.body.moves.sort(sortMove)).toStrictEqual(
      [
        {
          name: 'giga-drain',
          type: 'grass',
        },
        {
          name: 'grass-knot',
          type: 'grass',
        },
        {
          name: 'leaf-storm',
          type: 'grass',
        },
        {
          name: 'razor-leaf',
          type: 'grass',
        },
        {
          name: 'seed-bomb',
          type: 'grass',
        },
        {
          name: 'solar-beam',
          type: 'grass',
        },
        {
          name: 'energy-ball',
          type: 'grass',
        },
        {
          name: 'bullet-seed',
          type: 'grass',
        },
        {
          name: 'leaf-tornado',
          type: 'grass',
        },
      ].sort(sortMove),
    );
  });

  it('successful fight with name and id', async () => {
    const successfulFightWithNameAndId = await request(app).get('/pokemon/drowzee/fight/731');
    expect(successfulFightWithNameAndId.status).toBe(200);
    expect(successfulFightWithNameAndId.body).toHaveProperty('attacker');
    expect(successfulFightWithNameAndId.body).toHaveProperty('defender');
    expect(successfulFightWithNameAndId.body).toHaveProperty('moves');
    expect(successfulFightWithNameAndId.body.attacker).toBe('drowzee');
    expect(successfulFightWithNameAndId.body.defender).toBe('pikipek');
    expect(successfulFightWithNameAndId.body.moves.sort(sortMove)).toStrictEqual(
      [
        {
          name: 'ice-punch',
          type: 'ice',
        },
        {
          name: 'thunder-punch',
          type: 'electric',
        },
        {
          name: 'zap-cannon',
          type: 'electric',
        },
      ].sort(sortMove),
    );
  });

  it('successful fight without moves', async () => {
    const successfulFightWithoutMoves = await request(app).get('/pokemon/shaymin-land/fight/ditto');
    expect(successfulFightWithoutMoves.status).toBe(200);
    expect(successfulFightWithoutMoves.body).toHaveProperty('attacker');
    expect(successfulFightWithoutMoves.body).toHaveProperty('defender');
    expect(successfulFightWithoutMoves.body).toHaveProperty('moves');
    expect(successfulFightWithoutMoves.body.attacker).toBe('shaymin-land');
    expect(successfulFightWithoutMoves.body.defender).toBe('ditto');
    expect(successfulFightWithoutMoves.body.moves.sort(sortMove)).toStrictEqual([]);
  });

  it('successful fight with names', async () => {
    const successfulFightWithNames = await request(app).get('/pokemon/pidgey/fight/simisage');
    expect(successfulFightWithNames.status).toBe(200);
    expect(successfulFightWithNames.body).toHaveProperty('attacker');
    expect(successfulFightWithNames.body).toHaveProperty('defender');
    expect(successfulFightWithNames.body).toHaveProperty('moves');
    expect(successfulFightWithNames.body.attacker).toBe('pidgey');
    expect(successfulFightWithNames.body.defender).toBe('simisage');
    expect(successfulFightWithNames.body.moves.sort(sortMove)).toStrictEqual(
      [
        {
          name: 'wing-attack',
          type: 'flying',
        },
        {
          name: 'fly',
          type: 'flying',
        },
        {
          name: 'gust',
          type: 'flying',
        },
        {
          name: 'u-turn',
          type: 'bug',
        },
        {
          name: 'aerial-ace',
          type: 'flying',
        },
        {
          name: 'air-cutter',
          type: 'flying',
        },
        {
          name: 'heat-wave',
          type: 'fire',
        },
        {
          name: 'air-slash',
          type: 'flying',
        },
        {
          name: 'sky-attack',
          type: 'flying',
        },
        {
          name: 'hurricane',
          type: 'flying',
        },
        {
          name: 'brave-bird',
          type: 'flying',
        },
        {
          name: 'pluck',
          type: 'flying',
        },
      ].sort(sortMove),
    );
  });

  it('unsuccessful fight first id incorrect', async () => {
    const unsuccessfulFightFirstIdIncorrect = await request(app).get('/pokemon/1423/fight/123');
    expect(unsuccessfulFightFirstIdIncorrect.status).toBe(404);
    expect(unsuccessfulFightFirstIdIncorrect.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('unsuccessful fight second id incorrect', async () => {
    const unsuccessfulFightSecondIdIncorrect = await request(app).get('/pokemon/456/fight/6121');
    expect(unsuccessfulFightSecondIdIncorrect.status).toBe(404);
    expect(unsuccessfulFightSecondIdIncorrect.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('unsuccessful fight first name incorrect', async () => {
    const unsuccessfulFightFirstNameIncorrect = await request(app).get('/pokemon/giarados/fight/1');
    expect(unsuccessfulFightFirstNameIncorrect.status).toBe(404);
    expect(unsuccessfulFightFirstNameIncorrect.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('unsuccessful fight second name incorrect', async () => {
    const unsuccessfulFightSecondNameIncorrect = await request(app).get('/pokemon/1/fight/locario');
    expect(unsuccessfulFightSecondNameIncorrect.status).toBe(404);
    expect(unsuccessfulFightSecondNameIncorrect.body).toStrictEqual({
      error: 'Not Found',
    });
  });

  it('successful fight with same pokemons', async () => {
    const successfulFightWithSamePokemons = await request(app).get('/pokemon/448/fight/448');
    expect(successfulFightWithSamePokemons.status).toBe(200);
    expect(successfulFightWithSamePokemons.body).toHaveProperty('attacker');
    expect(successfulFightWithSamePokemons.body).toHaveProperty('defender');
    expect(successfulFightWithSamePokemons.body).toHaveProperty('moves');
    expect(successfulFightWithSamePokemons.body.attacker).toBe('lucario');
    expect(successfulFightWithSamePokemons.body.defender).toBe('lucario');
    expect(successfulFightWithSamePokemons.body.moves.sort(sortMove)).toStrictEqual(
      [
        {
          name: 'mud-slap',
          type: 'ground',
        },
        {
          name: 'counter',
          type: 'fighting',
        },
        {
          name: 'low-kick',
          type: 'fighting',
        },
        {
          name: 'earthquake',
          type: 'ground',
        },
        {
          name: 'dig',
          type: 'ground',
        },
        {
          name: 'rock-smash',
          type: 'fighting',
        },
        {
          name: 'drain-punch',
          type: 'fighting',
        },
        {
          name: 'focus-blast',
          type: 'fighting',
        },
        {
          name: 'aura-sphere',
          type: 'fighting',
        },
        {
          name: 'low-sweep',
          type: 'fighting',
        },
        {
          name: 'brick-break',
          type: 'fighting',
        },
        {
          name: 'focus-punch',
          type: 'fighting',
        },
        {
          name: 'power-up-punch',
          type: 'fighting',
        },
        {
          name: 'bulldoze',
          type: 'ground',
        },
        {
          name: 'close-combat',
          type: 'fighting',
        },
        {
          name: 'bone-rush',
          type: 'ground',
        },
        {
          name: 'vacuum-wave',
          type: 'fighting',
        },
        {
          name: 'force-palm',
          type: 'fighting',
        },
      ].sort(sortMove),
    );
  });
});
