export interface Ticker {
	exchange: string;
	pair: string;
	timestamp: Date;
	value: number;
}

export function availableExchanges(): Promise<string[]>;
export function availablePairs(exchange: string): Promise<string[]>;
export function ticker(exhange: string, pair: string): Promise<Ticker>;

