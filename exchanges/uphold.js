'use strict';

const request = require('request');

const pairs = [
	'btc_btc',
	'btc_usd',
	'btc_ltc',
	'btc_eth',
	'eth_btc',
	'eth_usd',
	'eth_btc',
	'eth_ltc',
	'ltc_eth',
	'ltc_btc',
	'ltc_usd',
	'chf_chf',
	'chf_cny',
	'chf_eur',
	'chf_gbp',
	'chf_inr',
	'chf_jpy',
	'chf_mxn',
	'chf_usd',
	'cny_cny',
	'eur_cny',
	'eur_eur',
	'eur_gbp',
	'eur_inr',
	'eur_jpy',
	'gbp_cny',
	'gbp_gbp',
	'gbp_inr',
	'gbp_jpy',
	'gbp_usd',
	'inr_cny',
	'inr_inr',
	'jpy_cny',
	'jpy_inr',
	'jpy_jpy',
	'mxn_cny',
	'mxn_eur',
	'mxn_gbp',
	'mxn_inr',
	'mxn_jpy',
	'mxn_mxn',
	'mxn_usd',
	'usd_cny',
	'usd_inr',
	'usd_jpy',
	'usd_usd',
	'xag_usd',
	'xag_xag',
	'xau_usd',
	'xau_xau',
	'xpd_usd',
	'xpd_xpd',
	'xpt_usd',
	'xpt_xpt'
	// There are more depending on the order.
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let uphold_pair;
				uphold_pair = k.map((e) => { return e; }).join('').toUpperCase();
				request({
					url: `https://api.uphold.com/v0/ticker/${uphold_pair}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'uphold',
							pair: pair,
							timestamp: (new Date()).getTime(),
							ask: parseFloat(x.ask),
							bid: parseFloat(x.bid)
						});
					}
					else {
						resolve({
							exchange: 'uphold',
							pair: pair,
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
