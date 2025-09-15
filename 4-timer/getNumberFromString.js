function getNumberFromString(string) {
	return Number(string.replace(/\D/g, ''));
}

module.exports = { getNumberFromString };