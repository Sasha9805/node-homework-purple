const { workerData, parentPort } = require('worker_threads');

let counter = 0;
for (let i = 0; i < workerData.length; i++) {
	if (workerData[i] % 3 === 0) {
		counter++;
	}
}

parentPort.postMessage(counter);