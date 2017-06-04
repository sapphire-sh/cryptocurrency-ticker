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
				request(`https://api.bithumb.com/public/ticker/${pair.split('_').shift().toUpperCase()}`, (err, res, body) => {
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
