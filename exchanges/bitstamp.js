'use strict';

const request = require('request');

const pairs = [
	'btc_usd',
	'btc_eur',
	'eur_usd',
	'xrp_usd', 
	'xrp_eur', 
	'xrp_btc', 
	'ltc_usd', 
	'ltc_eur', 
	'ltc_btc'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let bitstamp_pair;
				bitstamp_pair = k.map((e) => { return e; }).join('');
				request({
					url: `	https://www.bitstamp.net/api/v2/ticker/${bitstamp_pair}/`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'bitstamp',
							pair: pair,
							timestamp: x.timestamp,
							ask: parseFloat(x.ask),
							bid: parseFloat(x.bid)
						});
					}
					else {
						resolve({
							exchange: 'bitstamp',
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
