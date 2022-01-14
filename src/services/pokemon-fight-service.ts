import axios from 'axios';
import { PokemonFight } from '../schemas';

export async function fightRequest(identifier1: string | number, identifier2: string | number) {
  const pokemonRequestData1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier1}`);
  const pokemonRequestData2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier2}`);
  const resultFight: PokemonFight = {
    attacker: pokemonRequestData1.data.name,
    defender: pokemonRequestData2.data.name,
    moves: [],
  };

  const defenderTypes: string[] = [];
  pokemonRequestData2.data.types.forEach((a: { type: { name: string } }) => {
    defenderTypes.push(a.type.name);
  });

  const noDamageFrom = new Set<string>();
  const damageRelation = new Map<string, number>();

  await Promise.all(
    defenderTypes.map(async (defenderType: string) => {
      const typeRelationRequest = await axios.get(`https://pokeapi.co/api/v2/type/${defenderType}`);
      typeRelationRequest.data.damage_relations.no_damage_from.forEach((noDamageFromInfo: { name: string }) => {
        noDamageFrom.add(noDamageFromInfo.name);
      });
      typeRelationRequest.data.damage_relations.half_damage_from.forEach((halfDamageFromInfo: { name: string }) => {
        if (damageRelation.has(halfDamageFromInfo.name)) {
          damageRelation.set(halfDamageFromInfo.name, (damageRelation.get(halfDamageFromInfo.name) as number) - 1);
        } else {
          damageRelation.set(halfDamageFromInfo.name, -1);
        }
      });
      typeRelationRequest.data.damage_relations.double_damage_from.forEach((doubleDamageFromInfo: { name: string }) => {
        if (damageRelation.has(doubleDamageFromInfo.name)) {
          damageRelation.set(doubleDamageFromInfo.name, (damageRelation.get(doubleDamageFromInfo.name) as number) + 1);
        } else {
          damageRelation.set(doubleDamageFromInfo.name, 1);
        }
      });
    }),
  );

  await Promise.all(
    pokemonRequestData1.data.moves.map(async (moveInfo: { move: { name: string; url: string } }) => {
      const moveRequest = await axios.get(moveInfo.move.url);
      if ((moveRequest.data.damage_class.name as string) !== 'status' && noDamageFrom.has(moveRequest.data.type.name as string) === false) {
        if (damageRelation.has(moveRequest.data.type.name) && (damageRelation.get(moveRequest.data.type.name) as number) > 0) {
          resultFight.moves.push({ name: moveRequest.data.name, type: moveRequest.data.type.name });
        }
      }
    }),
  );
  return resultFight;
}
