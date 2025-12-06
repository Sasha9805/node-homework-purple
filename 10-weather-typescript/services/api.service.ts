import axios, { AxiosResponse } from "axios";
import { ALLOWED_LANGUAGES, getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import { WeatherResponse, WeatherRequestParams } from "../shared/api";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getIcon = (icon: string | undefined): string | undefined => {
	if (!icon) {
		return undefined;
	}

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

const fetchWeather = async (city: string, token: string, language: string): Promise<WeatherResponse> => {
	 const params: WeatherRequestParams = {
		q: city,
		appid: token,
		units: "metric",
		lang: language,
	};

	const { data } = await axios.get<WeatherResponse, AxiosResponse<WeatherResponse>>(BASE_URL, {
		params
	});

	return data;
};

const getWeather = async (cities: string[]): Promise<WeatherResponse[]> => {
	const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token) as string;
	const language = (process.env.WEATHER_LANG ?? await getKeyValue(TOKEN_DICTIONARY.language) ?? ALLOWED_LANGUAGES.en) as string;
	if (!token) {
		throw new Error('API token is not set. Use -t option to set it.');
	}

	const data = await Promise.all(cities.map(city => fetchWeather(city, token, language)));

	return data;
};

export { getWeather, getIcon };