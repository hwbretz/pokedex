import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State, ...args: string[]) => Promise<void>;
}


export type State = {
    reader: Interface,
    commands: Record<string, CLICommand>,
    poke: PokeAPI,
    pokedex: Record<string,Pokemon>,
    nextLocationsURL: string | null,
    prevLocationsURL: string | null,
}

export async function initState (){
    const lineReader = createInterface({
        input:process.stdin,
        output:process.stdout,
        prompt:"Pokedex > ",
    });

    let commands = getCommands();
    let pokedex = new PokeAPI(1000);
    let userPokedex : Record<string,Pokemon> = {};
    let state: State ={
        reader: lineReader,
        commands: getCommands(),
        poke: pokedex,
        pokedex: userPokedex,
        nextLocationsURL: null,
        prevLocationsURL: null,

    };

    return state;
}