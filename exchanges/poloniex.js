'use strict';

const request = require('request');

const pairs = [
	'btc_bcn',
	'btc_bela',
	'btc_blk',
	'btc_btcd',
	'btc_btm',
	'btc_bts',
	'btc_burst',
	'btc_clam',
	'btc_dash',
	'btc_dgb',
	'btc_doge',
	'btc_emc2',
	'btc_fldc',
	'btc_flo',
	'btc_game',
	'btc_grc',
	'btc_huc',
	'btc_ltc',
	'btc_maid',
	'btc_omni',
	'btc_naut',
	'btc_nav',
	'btc_neos',
	'btc_nmc',
	'btc_note',
	'btc_nxt',
	'btc_pink',
	'btc_pot',
	'btc_ppc',
	'btc_ric',
	'btc_sjcx',
	'btc_str',
	'btc_sys',
	'btc_via',
	'btc_xvc',
	'btc_vrc',
	'btc_vtc',
	'btc_xbc',
	'btc_xcp',
	'btc_xem',
	'btc_xmr',
	'btc_xpm',
	'btc_xrp',
	'usdt_btc',
	'usdt_dash',
	'usdt_ltc',
	'usdt_nxt',
	'usdt_str',
	'usdt_xmr',
	'usdt_xrp',
	'xmr_bcn',
	'xmr_blk',
	'xmr_btcd',
	'xmr_dash',
	'xmr_ltc',
	'xmr_maid',
	'xmr_nxt',
	'btc_eth',
	'usdt_eth',
	'btc_sc',
	'btc_bcy',
	'btc_exp',
	'btc_fct',
	'btc_rads',
	'btc_amp',
	'btc_dcr',
	'btc_lsk',
	'eth_lsk',
	'btc_lbc',
	'btc_steem',
	'eth_steem',
	'btc_sbd',
	'btc_etc',
	'eth_etc',
	'usdt_etc',
	'btc_rep',
	'usdt_rep',
	'eth_rep',
	'btc_ardr',
	'btc_zec',
	'eth_zec',
	'usdt_zec',
	'xmr_zec',
	'btc_strat',
	'btc_nxc',
	'btc_pasc',
	'btc_gnt',
	'eth_gnt',
	'btc_gno',
	'eth_gno'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				request({
					url: 'https://poloniex.com/public?command=returnTicker',
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body)[pair.toUpperCase()];
						resolve({
							exchange: 'poloniex',
							pair: pair,
							timestamp: (new Date()).getTime(),
							ask: parseFloat(x.lowestAsk),
							bid: parseFloat(x.highestBid)
						});
					}
					else {
						resolve({
							exchange: 'poloniex',
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
