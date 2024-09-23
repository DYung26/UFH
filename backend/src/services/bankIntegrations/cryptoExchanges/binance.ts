import { RestWalletTypes, RestMarketTypes, Spot } from '@binance/connector-typescript';

const baseURL = 'https://api.binance.com';

export const getBinanceTotalBalance = async (
    apiKey: string,
    apiSecret:string
): Promise<string> => {
    const client = new Spot(apiKey, apiSecret, { baseURL: baseURL });
    try {
	const response = await client.userAsset();
	const res: RestWalletTypes.userAssetResponse[] = response;
	let total = 0;
	for (const asset of res) {
	    const freeBalance = parseFloat(asset.free);
	    console.log(freeBalance);
	    const assetPrice = parseFloat(await getSymbolPriceTicker(asset.asset, apiKey, apiSecret));
            total += freeBalance * assetPrice;
	}
	console.log(total);
	return String(total);
    } catch (error) {
        console.error(error);
    }
    return "0"
}

// getBinanceTotalBalance(CONFIG.CRYPTO.BINANCE.API_KEY, CONFIG.CRYPTO.BINANCE.API_SECRET);

export const getSymbolPriceTicker = async (
    coin: string,
    apiKey: string,
    apiSecret: string
): Promise<string> => {
    const client = new Spot(apiKey, apiSecret, { baseURL: baseURL });

    const symbol = `${coin}USDT`;
    try {
        const response = await client.symbolPriceTicker({ symbol });

	if (Array.isArray(response)) {
            const resArray: RestMarketTypes.symbolPriceTickerResponse[] = response;
	    const ticker = resArray.find((item) => item.symbol === symbol);
	    if (ticker) {
                console.log(ticker);
		return ticker.price;
	    } else {
                throw new Error(`Symbol ${symbol} not found`);
	    }
	} else {
            const res: RestMarketTypes.symbolPriceTickerResponse = response;
	    console.log(res);
	    return res.price;
	}
    } catch (error) {
        console.error(error);
	return "NaN"; //throw error;
    }
}

// getSymbolPriceTicker('PIXEL', CONFIG.CRYPTO.BINANCE.API_KEY, CONFIG.CRYPTO.BINANCE.API_SECRET);

export const getBinanceWalletBalance = async (
    coin: string,
    apiKey: string,
    apiSecret: string
): Promise<string> => {
    const client = new Spot(apiKey, apiSecret, { baseURL: baseURL });

    try {
        const response = await client.userAsset();
        const res: RestWalletTypes.userAssetResponse[] = response;

        for (const asset of res) {
            if (asset.asset === coin) {
                return asset.free;
            }
        }

        return "NaN";
    } catch (err) {
        console.error(err);
        return "NaN";
    }
};

