# crypto-ticker
Get the current ticker information for cryptocurrencies

## Install

```bash
$ npm install -S crypto-ticker
```

## Usage
```js
const ticker = require('crypto-ticker');

ticker.availableExchanges().then((exchanges) => {
	console.log(exchanges);
});

ticker.availablePairs('kraken').then((pairs) => {
	console.log(pairs);
}).catch((err) => {
	console.error(err);
})

ticker.ticker('kraken', 'eth_jpy').then((ticker) => {
	console.log(ticker);
}).catch((err) => {
	console.error(err);
})
```
