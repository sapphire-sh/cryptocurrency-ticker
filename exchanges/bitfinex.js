'use strict';

const request = require('request');

const pairs = [
	'btc_usd',
	'ltc_usd',
	'ltc_btc',
	'eth_usd',
	'eth_btc',
	'etc_btc',
	'etc_usd',
	'rrt_usd',
	'rrt_btc',
	'zec_usd',
	'zec_btc',
	'xmr_usd',
	'xmr_btc',
	'dsh_usd',
	'dsh_btc',
	'bcc_btc',
	'bcu_btc',
	'bcc_usd',
	'bcu_usd',
	'xrp_usd',
	'xrp_btc',
	'iot_usd',
	'iot_btc'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let bitfinex_pair;
				bitfinex_pair = k.map((e) => { return e; }).join('');
				request({
					url: `https://api.bitfinex.com/v1/ticker/${bitfinex_pair}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						console.log(x);
						resolve({
							exchange: 'bitfinex',
							pair: pair,
							timestamp: x.timestamp,
							ask: parseFloat(x.ask),
							bid: parseFloat(x.bid)
						});
					}
					else {
						resolve({
							exchange: 'bitfinex',
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
