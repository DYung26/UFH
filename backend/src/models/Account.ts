export interface ApiKeyAccount extends LinkedAccount {
    api_key: string;
    api_secret: string;
}

export interface OAuthAccount extends LinkedAccount {
    access_token: string;
    refresh_token?: string;
}

export enum FinancialPlatform {
    BYBIT = 'bybit',
    BINANCE = 'binance'
}

export interface LinkedAccount {
    readonly account_type: FinancialPlatform;
    linked_at: Date;
    last_updated?: Date;
}
