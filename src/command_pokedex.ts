import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

export async function commandPokedex(state: State, ...args: string[]) {
    console.log("Your Pokedex:");
    for(let [key, value] of Object.entries(state.pokedex)){
        console.log(` - ${state.pokedex[key].name}`);
    }
}