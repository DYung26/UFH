import { RestClientV5 } from 'bybit-api';

// type AccountTypeV5 = 'UNIFIED' | 'SPOT' | 'CONTRACT';

export const getBybitWalletBalance = async (coin: string, apiKey: string,
					    apiSecret: string): Promise<string> => {
    const client = new RestClientV5({
        testnet: false,
        key: apiKey, // 'x29ldFtj3YSiIZOry5',
        secret: apiSecret, // 'X4Hw2fkWYdhgk7mHXdNVXquhFIZAVnicYbty',
    });

    try {
        const response = await client.getWalletBalance({
            accountType: 'UNIFIED',
            coin,
        });
	const balance = response.result.list.length > 0 ? response.result.list[0].totalEquity : "NaN";
	console.log('Wallet Balance:', response);
	return balance;
    } catch (error) {
        console.error('Error fetching Bybit wallet balance:', error);
	return "NaN";
    }
    // return "50";
};
// getBybitWalletBalance('BTC', 'x29ldFtj3YSiIZOry5', 'X4Hw2fkWYdhgk7mHXdNVXquhFIZAVnicYbty');
/*
client
    .getWalletBalance({
        accountType: 'UNIFIED',
        coin: 'BTC',
    })
    .then((response: any) => {
        console.log(response);
    })
    .catch((error: any) => {
        console.error(error);
    });
*/

