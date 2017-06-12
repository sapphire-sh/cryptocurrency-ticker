'use strict';

const request = require('request');

const pairs = [
	'btc_krw',
	'eth_krw',
	'dash_krw',
	'ltc_krw',
	'etc_krw',
	'xrp_krw'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				request({
					url: `https://api.bithumb.com/public/ticker/${pair.split('_').shift().toUpperCase()}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body).data;
						resolve({
							exchange: 'bithumb',
							pair: pair,
							timestamp: parseInt(x.date),
							ask: parseFloat(x.sell_price),
							bid: parseFloat(x.buy_price)
						});
					}
					else {
						resolve({
							exchange: 'bithumb',
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
