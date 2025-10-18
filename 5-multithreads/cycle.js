const { PerformanceObserver, performance } = require('perf_hooks');

const performanceObserver = new PerformanceObserver((items) => {
	for (const entry of items.getEntries()) {
		console.log(entry.name + ': ' + entry.duration);
	}
});

performanceObserver.observe({ entryTypes: ['measure'] });

// FIll an array
// const arr = new Array(3e5).fill(0).map((_, i) => i);
const arr = [];

for (let i = 0; i < 3e5; i++) {
	arr.push(i + 1);
}

console.log(arr[arr.length - 1]);

// Measure performance using a cycle
performance.mark('A');
let counter = 0;
for (let i = 0; i < arr.length; i++) {
	if (arr[i] % 3 === 0) {
		counter++;
	}
}
console.log(counter);
performance.mark('B');
performance.measure('Counting multiples of 3', 'A', 'B');
