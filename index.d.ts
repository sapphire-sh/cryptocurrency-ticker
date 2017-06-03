export interface Ticker {
	exchange: string;
	pair: string;
	timestamp: Date;
	value: number;
}

export class CryptocurrencyTicker {
	static availableExchanges(): string[];
	static availablePairs(exchange: string): string[];
	static ticker(exhange: string, pair: string): Ticker
}
