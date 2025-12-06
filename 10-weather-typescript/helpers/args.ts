import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ReturnArgs } from "../shared/args";

const getArgs = (args: string[]): ReturnArgs => {
	return yargs(hideBin(args)).option("h", { type: "boolean" })
	.option("l", { type: "string" })
	.option("t", { type: "string" })
	.option("s", { type: "string", array: true })
	.strict()
	.parse() as ReturnArgs;

	// Alternative implementation without yargs
	// const res = {};
	// const [executor, file, ...rest] = args;
	// let multipleArgs = [];

	// rest.forEach((value, index, array) => {
	// 	if (value[0] === '-') {
	// 		if (index === array.length - 1) {
	// 			res[value.slice(1)] = true;
	// 			multipleArgs = [];
	// 		} else if (array[index + 1] && array[index + 1][0] !== '-') {
	// 			res[value.slice(1)] = multipleArgs;
	// 		} else {
	// 			res[value.slice(1)] = true;
	// 			multipleArgs = [];
	// 		}
	// 	} else {
	// 		multipleArgs.push(value);
	// 		console.log(multipleArgs);
	// 	}
	// });

	// return res;
};

export { getArgs };