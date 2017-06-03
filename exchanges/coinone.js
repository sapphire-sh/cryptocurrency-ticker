'use strict';

const request = require('request');

const pairs = [
	'btc_krw',
	'eth_krw',
	'etc_krw',
	'xrp_krw'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				request(`https://api.coinone.co.kr/ticker/?currency=${pair.split('_').shift()}&format=json`, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'coinone',
							pair: pair,
							timestamp: new Date(x.timestamp),
							value: parseInt(x.last)
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
