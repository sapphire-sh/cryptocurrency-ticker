export interface Ticker {
	exchange: string;
	pair: string;
	timestamp: number;
	ask: number;
	bid: number;
}

export function availableExchanges(): Promise<string[]>;
export function availablePairs(exchange: string): Promise<string[]>;
export function ticker(exhange: string, pair: string): Promise<Ticker>;
