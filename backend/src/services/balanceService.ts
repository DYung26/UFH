import { CustomError } from "@utils/customError";
import { StatusCodes } from "http-status-codes";
import { AccountRepository } from "repositories/accountRepository";
import { getBinanceTotalBalance } from "./bankIntegrations/cryptoExchanges/binance";
import { getBybitWalletBalance } from "./bankIntegrations/cryptoExchanges/bybit";

export interface IBalanceService {
    getBalance(userId: string, accountType: string): Promise<string>;
}

export class BalanceService implements IBalanceService {
    constructor(private readonly accountDBRepo: AccountRepository) {}

    async getBalance(userId: string, accountType: string): Promise<string> {
        const account = await this.accountDBRepo.getAccountByType(userId, accountType);
	if (!account) {
            throw new CustomError('Account not found', StatusCodes.NOT_FOUND);
	}
	console.log(account);
	console.log(accountType);
	console.log(this.accountDBRepo.isApiKeyAccount(account));

	if (accountType === "bybit" && this.accountDBRepo.isApiKeyAccount(account)) {
            try {
                const balance = await getBybitWalletBalance("USDT", account.api_key, account.api_secret);
		console.log("Bybit wallet balance:", balance);
		return balance;
	    } catch (error) {
                console.error("Failed to get Bybit balance:", error);
    	        throw new CustomError(
			'Error fetching Bybit wallet balance',
			StatusCodes.INTERNAL_SERVER_ERROR);
	    }
	} else if (accountType === "binance" && this.accountDBRepo.isApiKeyAccount(account)) {
            try {
                const balance = await getBinanceTotalBalance(account.api_key, account.api_secret);
		console.log("Binance wallet balance:", balance);
		return balance;
	    } catch (error) {
                console.error("Failed to get Binance balance:", error);
		throw new CustomError(
                    'Error fetching Binance wallet balance',
		    StatusCodes.INTERNAL_SERVER_ERROR);
	    }
	}
	throw new CustomError('Unsupported account type', StatusCodes.BAD_REQUEST);
    }
}
