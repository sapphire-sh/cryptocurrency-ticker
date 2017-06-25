'use strict';

const request = require('request');

const pairs = [
	'btc_ltc',
	'btc_usd',
	'btc_eth',
	'btc_eur',
	'btc_gbp',
	'ltc_btc',
	'ltc_usd',
	'ltc_eth',
	'ltc_eur',
	'ltc_gbp',
	'eth_ltc',
	'eth_btc',
	'eth_usd',
	'eth_eur',
	'eth_gbp',
	'usd_ltc',
	'usd_btc',
	'usd_eth',
	'usd_eur',
	'usd_gbp'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let gdax_pair;
				gdax_pair = k.map((e) => { return e; }).join('-').toUpperCase();

				request({
					url: `https://api.gdax.com/products/${gdax_pair}/ticker`,
					headers: {
					    'User-Agent': 'request'
					},
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'gdax',
							pair: gdax_pair,
							timestamp: (new Date()).getTime(),
							ask: parseFloat(x.ask),
							bid: parseFloat(x.bid)
						});
					}
					else {
						resolve({
							exchange: 'gdax',
							pair: gdax_pair,
							timestamp: undefined,
							ask: undefined,
							bid: undefined
						});
					}
				});
			}
			else {
				reject(new Error('pair is not supported'));
			}
		});
	}
};
