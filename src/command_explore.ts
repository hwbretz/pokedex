import { State } from "./state.js";
import { Location } from "./pokeapi.js";

export async function commandExplore(state: State, ...args: string[]) {
    
    let location:Location = await state.poke.fetchLocation(args[0] ?? undefined);
    type pokemonList = {name: string};
    for( let pokeMan of location.pokemon_encounters){
        console.log(`- ${pokeMan.pokemon.name}`);
    }

}