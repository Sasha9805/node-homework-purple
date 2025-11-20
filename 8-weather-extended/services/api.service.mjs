import axios from "axios";
import { ALLOWED_LANGUAGES, getKeyValue, TOKEN_DICTIONARY } from './storage.service.mjs';

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩️';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};

const fetchWeather = async (city, token, language) => {
	const { data } = await axios.get(BASE_URL, {
		params: {
			q: city,
			appid: token,
			units: 'metric',
			lang: language
		}
	});

	return data;
};

const getWeather = async (cities) => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
	const language = process.env.WEATHER_LANG ?? await getKeyValue(TOKEN_DICTIONARY.language) ?? ALLOWED_LANGUAGES.en;
	if (!token) {
		throw new Error('API token is not set. Use -t option to set it.');
	}

	const data = await Promise.all(cities.map(city => fetchWeather(city, token, language)));

	return data;
};

export { getWeather, getIcon };