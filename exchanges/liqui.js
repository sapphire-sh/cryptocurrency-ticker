'use strict';

const request = require('request');

const pairs = [
  'ltc_btc',
  'steem_btc',
  'sbd_btc',
  'dash_btc',
  'ans_btc',
  'dct_btc',
  'icn_btc',
  'eth_btc',
  'xzc_btc',
  'golos_btc',
  'gbg_btc',
  'gnt_btc',
  'wings_btc',
  'plu_btc',
  'round_btc',
  'vsl_btc',
  '1st_btc',
  'waves_btc',
  'incnt_btc',
  'mln_btc',
  'time_btc',
  'gnt_eth',
  'ltc_eth',
  'dash_eth',
  '1st_eth',
  'icn_eth',
  'mln_eth',
  'round_eth',
  'waves_eth',
  'time_eth',
  'vsl_eth',
  'plu_eth',
  'incnt_eth',
  'ltc_usdt',
  'btc_usdt',
  'dash_usdt',
  'eth_usdt',
  'icn_usdt',
  'gnt_usdt',
  'round_usdt',
  'vsl_usdt',
  '1st_usdt',
  'waves_usdt',
  'mln_usdt',
  'time_usdt',
  'rep_btc',
  'edg_btc',
  'rep_eth',
  'edg_eth',
  'rep_usdt',
  'edg_usdt',
  'rlc_btc',
  'rlc_eth',
  'rlc_usdt',
  'trst_btc',
  'trst_eth',
  'trst_usdt',
  'wings_eth',
  'wings_usdt',
  'plu_usdt',
  'incnt_usdt',
  'gno_btc',
  'gno_eth',
  'gno_usdt',
  'gup_btc',
  'gup_eth',
  'gup_usdt',
  'taas_btc',
  'taas_eth',
  'taas_usdt',
  'lun_btc',
  'lun_eth',
  'lun_usdt',
  'tkn_btc',
  'tkn_eth',
  'tkn_usdt',
  'hmq_btc',
  'hmq_eth',
  'hmq_usdt',
  'bcap_btc',
  'bcap_eth',
  'bcap_usdt',
  'ant_btc',
  'ant_eth',
  'ant_usdt',
  'bat_btc',
  'bat_eth',
  'bat_usdt',
  'qrl_btc',
  'qrl_eth',
  'qrl_usdt',
  'bnt_btc',
  'bnt_eth',
  'bnt_usdt',
  'mgo_btc',
  'mgo_eth',
  'mgo_usdt',
  'myst_btc',
  'myst_eth',
  'myst_usdt',
  'sngls_btc',
  'sngls_eth',
  'sngls_usdt',
  'ptoy_btc',
  'ptoy_eth',
  'ptoy_usdt',
  'cfi_btc',
  'cfi_eth',
  'cfi_usdt',
  'snm_btc',
  'snm_eth',
  'snm_usdt'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				request({
					url: `https://api.liqui.io/api/3/ticker/${pair}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body)[pair];
						resolve({
							exchange: 'liqui',
							pair: pair,
							timestamp: (new Date()).getTime(),
							ask: parseFloat(x.buy),
							bid: parseFloat(x.sell)
						});
					}
					else {
						resolve({
							exchange: 'liqui',
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
