import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

export async function commandCatch(state: State, ...args: string[]) {
    const pokeman = args[0].toLowerCase();
    console.log(`Throwing a Pokeball at ${pokeman}...`);
    let pokemonToCatch:Pokemon = await state.poke.fetchPokemon(pokeman ?? undefined);
    // chance to catch pokemon
    let catchChance:number = 1/pokemonToCatch.base_experience;
    // the attempt
    let catchAttempt:number = Math.random();

    if(catchAttempt >= catchChance){
        console.log(`${pokeman} was caught!`);
        state.pokedex[`${pokeman}`] = pokemonToCatch;
    } else {
        console.log(`${pokeman} escaped!`)
    }
    
}