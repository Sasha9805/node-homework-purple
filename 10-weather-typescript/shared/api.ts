interface WeatherField {
	description: string;
	icon: string;
}

interface MainField {
	temp: number;
	feels_like: number;
	humidity: number;
}

interface WindField {
	speed: number;
}

interface WeatherRequestParams {
	q: string;
	appid: string;
	units: string;
	lang: string;
}

interface WeatherResponse {
	name: string;
	weather: WeatherField[];
	main: MainField;
	wind: WindField;
}

export type { WeatherResponse, WeatherRequestParams };