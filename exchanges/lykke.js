'use strict';

const request = require('request');

const pairs = [
	'aud_usd',
	'btc_chf',
	'btc_eur',
	'btc_gbp',
	'btc_jpy',
	'btc_lkk',
	'btc_lkk1y',
	'btc_usd',
	'chf_jpy',
	'eth_btc',
	'eth_chf',
	'eth_eur',
	'eth_gbp',
	'eth_lkk',
	'eth_usd',
	'eur_chf',
	'eur_gbp',
	'eur_jpy',
	'eur_usd',
	'fchi_eur',
	'gb032548_usd',
	'gbp_chf',
	'gbp_jpy',
	'gbp_usd',
	'gdaxi_eur',
	'hcp_btc',
	'hcp_chf',
	'hcp_eur',
	'hcp_gbp',
	'hcp_usd',
	'hmc_usd',
	'hsi_hkd',
	'lkk1y_chf',
	'lkk1y_eur',
	'lkk1y_gbp',
	'lkk1y_jpy',
	'lkk1y_lkk',
	'lkk1y_usd',
	'lkk_chf',
	'lkk_eur',
	'lkk_gbp',
	'lkk_jpy',
	'lkk_usd',
	'otcbc_chf',
	'rrb_chf',
	'rrb_eur',
	'rrb_gbp',
	'rrb_usd',
	'sheela_eur',
	'slr_btc',
	'slr_chf',
	'slr_eur',
	'slr_gbp',
	'slr_jpy',
	'slr_usd',
	'stoxx50e_eur',
	'time_btc',
	'time_chf',
	'time_eur',
	'time_gbp',
	'time_jpy',
	'time_lkk',
	'time_usd',
	'uk100_gbp',
	'usd_cad',
	'usd_chf',
	'usd_czk',
	'usd_dkk',
	'usd_hkd',
	'usd_huf',
	'usd_ils',
	'usd_jpy',
	'usd_mxn',
	'usd_nok',
	'usd_nzd',
	'usd_pln',
	'usd_rub',
	'usd_sek',
	'usd_sgd',
	'usd_try',
	'usd_zar',
	'vaa017427_usd',
	'vaa022325_usd',
	'vaa025876_usd',
	'xag_usd',
	'xau_usd',
	'xpd_usd',
	'xpt_usd',
	'zra_chf'
];

module.exports = {
	pairs,
	ticker: (pair) => {
		return new Promise((resolve, reject) => {
			if(pairs.includes(pair)) {
				const k = pair.split('_');
				let lykke_pair;
				lykke_pair = k.map((e) => { return e; }).join('').toUpperCase();
				request({
					url: `https://api.lykkex.com/api/AllAssetPairRates/${lykke_pair}`,
					timeout: 2000
				}, (err, res, body) => {
					if(!err && res.statusCode === 200) {
						const x = JSON.parse(body);
						resolve({
							exchange: 'lykke',
							pair: pair,
							timestamp: (new Date()).getTime(),
							ask: parseFloat(x.Result.Rate.Ask),
							bid: parseFloat(x.Result.Rate.Bid)
						});
					}
					else {
						resolve({
							exchange: 'lykke',
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
