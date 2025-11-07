import {cleanInput} from "./repl";
import {describe,expect,test} from "vitest";

describe.each([
	{
		input: " hello world ",
		expected: ["hello","world"],
	},
	{
		input: "    wilkomen jah jah jah  ",
		expected: ["wilkomen","jah","jah","jah"],
	},
	{
		input: "smackcracklepop",
		expected: ["smackcracklepop"],
	}
])("cleanInput($input)",({input,expected}) => {
	test(`Expected: ${expected}`, () => {
		let actual = cleanInput(input);
		expect(actual).toHaveLength(expected.length);
		for (const i in expected){
			expect(actual[i]).toBe(expected[i]);
		}
	});
});
