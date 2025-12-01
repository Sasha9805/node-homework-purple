import express from 'express';
import { getWeather } from "./services/api.service.mjs";
import { getKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.mjs";

const PORT = process.env.PORT || 8000;

const createServer = () => {
	const app = express();

	app.get('/', async (req, res) => {
		console.log('Received request for weather data');
		try {
			const cities = process.env.CITY ? [process.env.CITY] : await getKeyValue(TOKEN_DICTIONARY.cities) ?? [];
			const weatherData = await getWeather(cities);

			res.json({data: weatherData});
		} catch (err) {
			if (err?.response?.status === 404) {
				res.status(404).send('City not found');
			} else if (err?.response?.status === 401) {
				res.status(401).send('Invalid API token');
			} else {
				// Not an axios error
				res.status(500).send('Internal Server Error');
			}
		}
	});

	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
};

export { createServer };