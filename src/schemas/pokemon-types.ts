export interface PokemonFight {
  attacker: string;
  defender: string;
  moves: {
    name: string;
    type: string;
  }[];
}

export interface Pokemon {
  name: string;
  types: string[];
  id: number;
}
