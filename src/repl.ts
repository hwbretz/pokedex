import { createInterface } from "node:readline";
import { type State } from "./state.js";
import { getCommands} from "./commands.js";


export function cleanInput(input: string){
	input = input.trim();
	const words: string[] = input.split(" ");
	for (let idx = 0; idx < words.length;idx++){
		words[idx] = words[idx].trim().toLowerCase();
	}
	return words;
}

//const { createInterface } = require('node:readline');


export  function startREPL(state: State): void {
	state.reader.prompt();

	state.reader.on("line",async (input:string) => {
		let inputArr:string[] = cleanInput(input);
		if (inputArr.length <= 0){
			state.reader.prompt();
		}
		
		const command = state.commands[inputArr[0]];
		if(!command){
			console.log(`Unknown command: "${inputArr[0]}". Type help for list of commands.`);
			state.reader.prompt();
			return;
		}
		
		try{
			await command.callback(state,inputArr[1]);
		} catch (err){
			console.log(err);
		}
		
		state.reader.prompt();
		
	})/*.on('close', () => {
		commandExit();
});*/
};
