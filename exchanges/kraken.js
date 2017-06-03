'use strict';

const request = require('request');

const pairs = [
	'dash_eur',
	'dash_usd',
	'dash_btc',
	'gno_eth',
	'gno_eur',
	'gno_usd',
	'gno_btc',
	'usdt_usd',
	'etc_eth',
	'etc_btc',
	'etc_eur',
	'etc_usd',
	'eth_btc',
	'eth_cad',
	'eth_eur',
	'eth_gbp',
	'eth_jpy',
	'eth_usd',
	'icn_eth',
	'icn_btc',
	'ltc_btc',
	'ltc_eur',
	'ltc_usd',
	'mln_eth',
	'mln_btc',
	'rep_eth',
	'rep_btc',
	'rep_eur',
	'rep_usd',
	'btc_cad',
	'btc_eur',
	'btc_gbp',
	'btc_jpy',
	'btc_usd',
	'xdg_btc',
	'xlm_btc',
	'xlm_eur',
	'xlm_usd',
	'xmr_btc',
	'xmr_eur',
	'xmr_usd',
	'xrp_btc',
	'xrp_cad',
	'xrp_eur',
	'xrp_jpy',
	'xrp_usd',
	'zec_btc',
	'zec_eur',
	'zec_usd'
];

const symbols = {
	'btc': 'XXBT',
	'eth': 'XETH',
	'xrp': 'XXRP',
	'xlm': 'XXLM',
	'xdg': 'XXDG',
	'xmr': 'XXMR',
	'icn': 'XICN',
	'ltc': 'XLTC',
	'rep': 'XREP',
	'mln': 'XMLN',
	'zec': 'XZEC',
	'usdt': 'USDT',
	'cad': 'ZCAD',
	'eur': 'ZEUR',
	'gbp': 'ZGBP',
	'jpy': 'ZJPY',
	'usd': 'ZUSD',
};

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let kraken_pair;
				if((k[0] === 'dash') || (k[0] === 'gno')) {
					kraken_pair = k.map((e) => { return e === 'btc' ? 'xbt' : e; }).join('').toUpperCase();
				}
				else {
					kraken_pair = k.map((e) => { return symbols[e]; }).join('').toUpperCase();
				}
				request(`https://api.kraken.com/0/public/Ticker?pair=${kraken_pair}`, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body).result[kraken_pair];
						resolve({
							exchange: 'kraken',
							pair: pair,
							timestamp: new Date(),
							value: parseInt(x.a.shift())
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
