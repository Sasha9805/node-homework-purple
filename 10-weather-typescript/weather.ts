#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { getWeather, getIcon } from "./services/api.service.js";
import { printError, printHelp, printSuccess, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY, ALLOWED_LANGUAGES } from "./services/storage.service.js";
import { isAxiosError } from "axios";

const saveToken = async (token: string) => {
	if (!token.length) {
		printError('Token value is not provided');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved successfully');
	} catch (err) {
		if (err instanceof Error) {
			printError(err.message);
		}
	}
};

const saveCities = async (cities: string[]) => {
	if (!cities.length) {
		printError('You must provide at least one city');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.cities, cities);
		printSuccess('Cities saved successfully');
	} catch (err) {
		if (err instanceof Error) {
			printError(err.message);
		}
	}
};

const saveLanguage = async (language: string) => {
	if (!language.length) {
		printError('Language is not provided');
		return;
	}

	if (!ALLOWED_LANGUAGES[language as keyof typeof ALLOWED_LANGUAGES]) {
		printError('Language is not supported');
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.language, language);
		printSuccess('Language saved successfully');
	} catch (err) {
		if (err instanceof Error) {
			printError(err.message);
		}
	}
};

const getForecast = async () => {
	try {
		const cities = process.env.CITY ? [process.env.CITY] : await getKeyValue(TOKEN_DICTIONARY.cities) as string[] ?? [];
		const weatherData = await getWeather(cities);

		weatherData.forEach(weather => {
			const icon = getIcon(weather.weather[0]?.icon);
			printWeather(weather, icon);
		});
	} catch (err) {
		if (!err || !(err instanceof Error)) {
			printError('An unknown error occurred');
			return;
		}

		if (!isAxiosError(err)) {
			printError(err.message);
			return;
		}

		if (err?.response?.status === 404) {
			printError('City not found');
		} else if (err?.response?.status === 401) {
			printError('Invalid API token');
		} else {
			printError(err.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.l) {
		return saveLanguage(args.l);
	}

	if (!!args.s?.length) {
		return saveCities(args.s);
	}

	if (args.t) {
		return saveToken(args.t);
	}

	return getForecast();
};

initCLI();