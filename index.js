'use strict';

const bithumb = require('./exchanges/bithumb');
const coinone = require('./exchanges/coinone');
const korbit = require('./exchanges/korbit');
const kraken = require('./exchanges/kraken');
const poloniex = require('./exchanges/poloniex');
const bitstamp = require('./exchanges/bitstamp');

const exchanges = {
	bithumb,
	coinone,
	korbit,
	kraken,
	poloniex,
	bitstamp
};

function availableExchanges() {
	return Promise.resolve(Object.keys(exchanges));
}

function availablePairs(exchange) {
	return availableExchanges().then((exchanges) => {
		return exchanges.includes(exchange) ? Promise.resolve() : Promise.reject();
	}).then(() => {
		return Promise.resolve(exchanges[exchange].pairs);
	});
}

function ticker(exchange, pair) {
	return exchanges[exchange].ticker(pair);
}

module.exports = {
	ticker,
	availableExchanges,
	availablePairs
};
