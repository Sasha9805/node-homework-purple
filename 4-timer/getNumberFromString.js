function getNumberFromString(string) {
	return Number(string.replace(/\D/, ''));
}

module.exports = { getNumberFromString };