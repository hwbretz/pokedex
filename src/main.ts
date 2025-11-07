import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main(){
	let newState = await initState();
	startREPL(newState);

}

main();




