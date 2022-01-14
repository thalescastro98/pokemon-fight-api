import axios from 'axios';
import { Pokemon } from '../schemas';

export const pokemonRequest = async (identifier: string | number) => {
  const pokemonRequestData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${identifier}`);
  const resultPokemon: Pokemon = {
    id: pokemonRequestData.data.id,
    name: pokemonRequestData.data.name,
    types: [],
  };
  pokemonRequestData.data.types.forEach((typeInfo: { type: { name: string } }) => {
    resultPokemon.types.push(typeInfo.type.name);
  });
  return resultPokemon;
};
