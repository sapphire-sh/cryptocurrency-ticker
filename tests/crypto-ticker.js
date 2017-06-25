'use strict';

const chai = require('chai');
const { expect } = chai;

const ticker = require('../index');

describe('available exchanges', () => {
	it('should return an array of available exchanges', (done) => {
		ticker.availableExchanges().then((exchanges) => {
			expect(exchanges).to.be.an('array');
			done();
		}).catch((err) => {
			done(err);
		});
	});
});

describe('available pairs', () => {
	it('should return an array of available pairs of an exchange', (done) => {
		ticker.availablePairs('kraken').then((pairs) => {
			expect(pairs).to.be.an('array');
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('should throw an error', (done) => {
		ticker.availablePairs('hello').then((pairs) => {
			expect(pairs).to.be.an('array');
			done();
		}).catch((err) => {
			done(err);
		});
	});
});

describe('ticker', () => {
	[
		{
			exchange: 'bithumb',
			pair: 'btc_krw'
		},
		{
			exchange: 'coinone',
			pair: 'btc_krw'
		},
		{
			exchange: 'korbit',
			pair: 'btc_krw'
		},
		{
			exchange: 'kraken',
			pair: 'btc_jpy'
		},
		{
			exchange: 'poloniex',
			pair: 'btc_xrp'
		},
		{
			echange: 'gemini',
			pair: 'btc_usd'
    },
    {
			exchange: 'lykke',
			pair: 'btc_jpy'
    },
    {
			exchange: 'bitfinex',
			pair: 'xrp_usd'
    },
    {
			exchange: 'bitstamp',
			pair: 'xrp_usd'
    },
    {
			exchange: 'uphold',
			pair: 'xpd_usd'
		},
	].forEach((e) => {
		it(`should return a ticker: ${e.exchange}`, (done) => {
			ticker.ticker(e.exchange, e.pair).then((ticker) => {
				expect(ticker).to.be.an('object');
				expect(ticker).to.have.all.keys([
					'exchange',
					'pair',
					'timestamp',
					'ask',
					'bid'
				]);
				expect(ticker.exchange).to.be.a('string');
				expect(ticker.pair).to.be.a('string');
				expect(ticker.timestamp).to.be.a('number');
				expect(ticker.ask).to.be.a('number');
				expect(ticker.bid).to.be.a('number');
				expect(ticker.exchange).to.equal(e.exchange);
				expect(ticker.pair).to.equal(e.pair);
				done();
			}).catch((err) => {
				done(err);
			});
		});
	});
});
