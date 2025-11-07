import { stat } from "fs";
import { State } from "./state.js";

export async function commandMap(state: State):Promise<void> {
    
            let locations = await state.poke.fetchLocations(state.nextLocationsURL ?? undefined);
            state.nextLocationsURL = locations.next;
            state.prevLocationsURL = locations.previous;
            for(let loc of locations.results){
                console.log(`${loc}`);
            }
}