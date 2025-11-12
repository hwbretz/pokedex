import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { CLICommand } from "./state.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "prints a helpful message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "list map locations",
            callback: commandMap,
        },
        mapb: {
            name:"mapb",
            description: "go backward in map list",
            callback: commandMapB,
        },
        explore: {
            name:"explore",
            description: "see pokemon per area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "try and catch a pokemon by name",
            callback: commandCatch,
        }
        //can add more commands here
    }
}