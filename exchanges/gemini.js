'use strict';

const request = require('request');

const pairs = [
	'btc_usd',
	'eth_btc',
	'eth_usd'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let gemini_pair;
				gemini_pair = k.map((e) => { return e; }).join('');
				request({
					url: `https://api.gemini.com/v1/pubticker/${gemini_pair}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'gemini',
							pair: pair,
							timestamp: x.volume.timestamp,
							ask: parseFloat(x.ask),
							bid: parseFloat(x.bid)
						});
					}
					else {
						resolve({
							exchange: 'gemini',
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
