import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	cities: 'cities',
	language: 'language'
};

const ALLOWED_LANGUAGES = {
	en: 'en',
	ru: 'ru',
};

const saveKeyValue = async (key, value) => {
	let data = {};
	const isFileExist = await isExist(filePath);

	if (isFileExist) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}

	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
	const isFileExist = await isExist(filePath);

	if (isFileExist) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		return data[key];
	}

	return undefined;
};

const isExist = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch (err) {
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY, ALLOWED_LANGUAGES };