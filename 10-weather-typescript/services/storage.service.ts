import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { Value, Dictionary } from "../shared/storage";

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
	token: 'token',
	cities: 'cities',
	language: 'language'
} as const;

const ALLOWED_LANGUAGES = {
	en: 'en',
	ru: 'ru',
} as const;

const saveKeyValue = async (key: string, value: Value): Promise<void> => {
	let data: Dictionary = {};
	const isFileExist = await isExist(filePath);

	if (isFileExist) {
		const file = await promises.readFile(filePath, 'utf-8');
		data = JSON.parse(file);
	}

	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key: string): Promise<Value | undefined> => {
	const isFileExist = await isExist(filePath);

	if (isFileExist) {
		const file = await promises.readFile(filePath, 'utf-8');
		const data = JSON.parse(file);
		return data[key];
	}

	return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
	try {
		await promises.stat(path);
		return true;
	} catch (err) {
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY, ALLOWED_LANGUAGES };