export interface ApiKeyAccount extends LinkedAccount {
    apiKey: string;
    apiSecret: string;
}

export interface OAuthAccount extends LinkedAccount {
    accessToken: string;
    refreshToken?: string;
}

export enum FinancialPlatform {
    BYBIT = 'bybit',
    BINANCE = 'binance'
}

export interface LinkedAccount {
    readonly accountType: FinancialPlatform;
    linkedAt: Date;
    lastUpdated?: Date;
}
