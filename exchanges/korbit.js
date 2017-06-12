'use strict';

const request = require('request');

const pairs = [
	'btc_krw',
	'eth_krw',
	'xrp_krw'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				request({
					url: `https://api.korbit.co.kr/v1/ticker/detailed?currency_pair=${pair}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'korbit',
							pair: pair,
							timestamp: x.timestamp,
							ask: parseFloat(x.ask),
							bid: parseFloat(x.bid)
						});
					}
					else {
						resolve({
							exchange: 'korbit',
							pair: pair,
							timestamp: undefined,
							ask: undefined,
							bid: undefined
						});
					}
				});
			}
			else {
				reject('pair is not supported');
			}
		});
	}
};
