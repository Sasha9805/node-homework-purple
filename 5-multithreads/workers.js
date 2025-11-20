const { Worker } = require('worker_threads');
const { PerformanceObserver, performance } = require('perf_hooks');

process.env.UV_THREADPOOL_SIZE = 8;
const arr = new Array(3e5).fill(0).map((_, i) => i + 1);

const performanceObserver = new PerformanceObserver((items) => {
	for (const entry of items.getEntries()) {
		console.log(entry.name + ': ' + entry.duration);
	}
});

performanceObserver.observe({ entryTypes: ['measure'] });

function divideArray(array, amount = process.env.UV_THREADPOOL_SIZE) {
	const chunkSize = Math.ceil(array.length / amount);
	const chunks = [];
	for (let i = 0; i < amount; i++) {
		const start = i * chunkSize;
		const end = start + chunkSize;
		if (i === amount - 1) {
			chunks.push(array.slice(start));
			break;
		}
		chunks.push(array.slice(start, end));
	}
	return chunks;
}

const chunks = divideArray(arr);

for (let i = 0; i < chunks.length; i++) {
	let chunk = chunks[i];
	performance.mark(`worker-start-${i}`);
	const worker = new Worker(`${__dirname}/worker.js`, {
		workerData: chunk,
	});

	worker.on('message', (msg) => {
		performance.mark(`worker-end-${i}`);
		performance.measure(
			`Worker ${worker.threadId} processing time`,
			`worker-start-${i}`,
			`worker-end-${i}`
		);
		console.log(`Worker ${worker.threadId} finished with result: ${msg}`);
	});

	worker.on('exit', (code) => {
		console.log(`Worker exited with code ${code}`);
	});
}