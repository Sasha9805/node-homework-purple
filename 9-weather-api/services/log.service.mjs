import chalk from 'chalk';
import dedent from 'dedent';

const printError = (error) => {
	console.log(chalk.bgRed(' ERROR '), error);
};

const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS '), message);
};

const printHelp = () => {
	console.log(dedent`
		${chalk.bgCyan(' HELP ')}
		No parameters - display weather
		-s [CITY] to set city
		-t [API_KEY] to set API key
		-h to display help
	`);
};

const printWeather = (res, icon) => {
	console.log(dedent`${chalk.bgYellow(' WEATHER ')} Weather in the city ${res.name}
		${icon}  ${res.weather[0].description}
		Temperature: ${res.main.temp} (feels like ${res.main.feels_like})
		Humidity: ${res.main.humidity}%
		Wind speed: ${res.wind.speed} m/s`
	);
};

export { printError, printSuccess, printHelp, printWeather };