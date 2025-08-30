const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const OPERATIONS = ['add', 'multiply'];

let firstNumber = process.argv[2];
let secondNumber = process.argv[3];
const operation = process.argv[4];

if (!OPERATIONS.includes(operation)) {
  console.log('Unknown operation');
  process.exit(1);
}

if (isNaN(firstNumber) || isNaN(secondNumber)) {
  console.log('Invalid number');
  process.exit(1);
}

firstNumber = Number(firstNumber);
secondNumber = Number(secondNumber);

if (isNaN(firstNumber) || isNaN(secondNumber)) {
  console.log('Invalid number');
  process.exit(1);
}

eventEmitter.on('add', (a, b) => {
  eventEmitter.emit('result', a + b);
});

eventEmitter.on('multiply', (a, b) => {
  eventEmitter.emit('result', a * b);
});

eventEmitter.on('result', (res) => {
	console.log('Result:', res);
});

eventEmitter.emit(operation, firstNumber, secondNumber);