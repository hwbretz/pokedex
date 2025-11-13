import { State } from "./state.js";
import { Pokemon } from "./pokeapi.js";

export async function commandInspect(state: State, ...args: string[]) {
    const pokeman = args[0].toLowerCase();
    if (state.pokedex[pokeman]){
        console.log(`Name: ${state.pokedex[pokeman].name}`);
        console.log(`Height: ${state.pokedex[pokeman].height}`);
        console.log(`Weight: ${state.pokedex[pokeman].weight}`);
        console.log("Stats:");
        for (let actualStat of state.pokedex[pokeman].stats){
            console.log(`  -${actualStat.stat.name}: ${actualStat.base_stat}`)
        }
    } else {
        console.log("you have not caught that pokemon");
    }
}