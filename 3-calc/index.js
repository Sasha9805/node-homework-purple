const add = require('./add');
const multiply = require('./multiply');

let firstNumber = process.argv[2];
let secondNumber = process.argv[3];
const operation = process.argv[4];

const OPERATIONS = ['add', 'multiply'];

if (!OPERATIONS.includes(operation)) {
  console.log('Unknown operation');
  process.exit(1);
}

if (!firstNumber || !secondNumber ) {
  console.log('Invalid number');
  process.exit(1);
}

firstNumber = Number(firstNumber);
secondNumber = Number(secondNumber);

if (isNaN(firstNumber) || isNaN(secondNumber)) {
  console.log('Invalid number');
  process.exit(1);
}

switch (operation) {
	case "add":
		console.log('Result: ', add(firstNumber, secondNumber));
		break;
	case "multiply":
		console.log('Result:', multiply(firstNumber, secondNumber));
		break;
	default:
		console.log('Unknown operation');
		break;
}