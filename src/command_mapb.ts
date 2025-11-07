import { State } from "./state.js";

export async function commandMapB(state: State) : Promise<void>{
    if(!state.prevLocationsURL){
        console.log("you're on the first page");
    }else{
        let locations = await state.poke.fetchLocations(state.prevLocationsURL);
        state.prevLocationsURL = locations.previous;
        state.nextLocationsURL = locations.next;
        for(let loc of locations.results){
            console.log(`${loc}`);
        }
    }
    
}