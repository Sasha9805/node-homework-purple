const notifier = require('node-notifier');
const { getNumberFromString } = require('./getNumberFromString');

let timeArgs = process.argv.slice(2);
let time = ['0h', '0m', '0s'];
timeArgs.forEach((arg) => {
	switch (arg[arg.length - 1]) {
		case 'h':
			time[0] = arg;
			break;
		case 'm':
			time[1] = arg;
			break;
		case 's':
			time[2] = arg;
			break;
		default:
			console.log(`Unknown time format: ${arg}`);
			process.exit(1);
	}
});

let [hours, minutes, seconds] = time.map(arg => getNumberFromString(arg));

const milliseconds = ((hours * 3600) + (minutes * 60) + seconds) * 1000;

if (milliseconds <= 0) {
  console.log('Please provide a valid time duration.');
  process.exit(1);
}

setTimeout(() => {
	console.log(`Waited for ${hours} hours, ${minutes} minutes and ${seconds} seconds`);
	notifier.notify({
		title: 'Timer Finished',
		message: `Your timer for ${hours}h ${minutes}m ${seconds}s has ended.`,
		icon:  `${__dirname}/icon-finish.jpg`,
		sound: true, // doesn't work on Linux
	});
	process.exit(0);
}, milliseconds);