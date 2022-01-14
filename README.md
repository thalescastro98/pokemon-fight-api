# Pokemon Fight API

## Description

The purpose of this API is to list which pokemon moves are super effective against another pokemon (status moves are not considered).

## Knowledge applied to API

- TypeScript
- Node
- Express
- Axios
- Jest
- ESLint
- Prettier

## Scripts

- `npm ci` - installs all dependencies.

- `npm run dev` - starts the local server.

- `npm run build` - transpile the typescript into JavaScript on **dist** folder.

- `npm run start` - starts the local server from the file transpiled by the command `npm run build`.

- `npm run test` - runs all test on **tests** folder.

## Endpoints

In the postman folder there is a file with the endpoints examples.

### `GET /pokemon/:identifier`

In this endpoint, you must put the pokemon name or pokemon id in place of `identifier`. You will get a json with `id` (pokemon id), `name` (pokemon name) and `type` (an array where each element is a pokemon type). For example, for `/pokemon/bulbasaur` and `/pokemon/1` you will get the json:

```
{
    "id": 1,
    "name": "bulbasaur",
    "types": [
        "grass",
        "poison"
    ]
}
```

### `GET /pokemon/:identifier1/fight/:identifier2`

In this endpoint, in place of `identifier1` you must put the name or id of the attacking pokemon and in place of `identifier2` you must put the name or id of the defending pokemon. You will get a json with `attacker` (name of attacking pokemon), `defender` (name of defending pokemon) and `moves`. `moves` is an array where each element is an object with `name` (move name) and `type` (move type). In `moves`, there will only be moves from the attacking pokemon that are super effective against the defending pokemon. Status moves were not considered. For example for `/pokemon/12/fight/123` you will get the json:

```
{
    "attacker": "butterfree",
    "defender": "scyther",
    "moves": [
        {
            "name": "acrobatics",
            "type": "flying"
        },
        {
            "name": "electroweb",
            "type": "electric"
        },
        {
            "name": "air-cutter",
            "type": "flying"
        },
        {
            "name": "air-slash",
            "type": "flying"
        },
        {
            "name": "aerial-ace",
            "type": "flying"
        },
        {
            "name": "gust",
            "type": "flying"
        }
    ]
}
```
