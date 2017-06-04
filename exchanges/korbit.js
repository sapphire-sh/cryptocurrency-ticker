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
				request(`https://api.korbit.co.kr/v1/ticker?currency_pair=${pair}`, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'korbit',
							pair: pair,
							timestamp: new Date(x.timestamp),
							value: parseFloat(x.last)
						});
					}
					else {
						reject(err);
					}
				});
			}
			else {
				reject('pair is not supported');
			}
		});
	}
};
