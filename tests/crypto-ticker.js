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
	it('should return a ticker: bithumb', (done) => {
		const exchange = 'bithumb';
		const pair = 'btc_krw';
		ticker.ticker(exchange, pair).then((ticker) => {
			expect(ticker).to.be.an('object');
			expect(ticker).to.have.all.keys([
				'exchange',
				'pair',
				'timestamp',
				'value'
			]);
			expect(ticker.exchange).to.be.a('string');
			expect(ticker.pair).to.be.a('string');
			expect(ticker.timestamp).to.be.a('date');
			expect(ticker.value).to.be.a('number');
			expect(ticker.exchange).to.equal(exchange);
			expect(ticker.pair).to.equal(pair);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('should return a ticker: coinone', (done) => {
		const exchange = 'coinone';
		const pair = 'btc_krw';
		ticker.ticker(exchange, pair).then((ticker) => {
			expect(ticker).to.be.an('object');
			expect(ticker).to.have.all.keys([
				'exchange',
				'pair',
				'timestamp',
				'value'
			]);
			expect(ticker.exchange).to.be.a('string');
			expect(ticker.pair).to.be.a('string');
			expect(ticker.timestamp).to.be.a('date');
			expect(ticker.value).to.be.a('number');
			expect(ticker.exchange).to.equal(exchange);
			expect(ticker.pair).to.equal(pair);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('should return a ticker: korbit', (done) => {
		const exchange = 'korbit';
		const pair = 'btc_krw';
		ticker.ticker(exchange, pair).then((ticker) => {
			expect(ticker).to.be.an('object');
			expect(ticker).to.have.all.keys([
				'exchange',
				'pair',
				'timestamp',
				'value'
			]);
			expect(ticker.exchange).to.be.a('string');
			expect(ticker.pair).to.be.a('string');
			expect(ticker.timestamp).to.be.a('date');
			expect(ticker.value).to.be.a('number');
			expect(ticker.exchange).to.equal(exchange);
			expect(ticker.pair).to.equal(pair);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('should return a ticker: kraken', (done) => {
		const exchange = 'kraken';
		const pair = 'btc_jpy';
		ticker.ticker(exchange, pair).then((ticker) => {
			expect(ticker).to.be.an('object');
			expect(ticker).to.have.all.keys([
				'exchange',
				'pair',
				'timestamp',
				'value'
			]);
			expect(ticker.exchange).to.be.a('string');
			expect(ticker.pair).to.be.a('string');
			expect(ticker.timestamp).to.be.a('date');
			expect(ticker.value).to.be.a('number');
			expect(ticker.exchange).to.equal(exchange);
			expect(ticker.pair).to.equal(pair);
			done();
		}).catch((err) => {
			done(err);
		});
	});

	it('should return a ticker: poloniex', (done) => {
		const exchange = 'poloniex';
		const pair = 'btc_xrp';
		ticker.ticker(exchange, pair).then((ticker) => {
			expect(ticker).to.be.an('object');
			expect(ticker).to.have.all.keys([
				'exchange',
				'pair',
				'timestamp',
				'value'
			]);
			expect(ticker.exchange).to.be.a('string');
			expect(ticker.pair).to.be.a('string');
			expect(ticker.timestamp).to.be.a('date');
			expect(ticker.value).to.be.a('number');
			expect(ticker.exchange).to.equal(exchange);
			expect(ticker.pair).to.equal(pair);
			done();
		}).catch((err) => {});
	});
});
