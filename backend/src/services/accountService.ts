import { ApiKeyAccount, OAuthAccount } from "models/Account";
import { AccountRepository } from "repositories/accountRepository";

export interface IAccountService{
    linkAccount(userId: string, accountData: ApiKeyAccount | OAuthAccount): Promise<void>;
    getAccountByType(userId: string, accountType: string): Promise<ApiKeyAccount | OAuthAccount>;
}

export class AccountService implements IAccountService {
    constructor(
        private readonly accountDBRepo: AccountRepository,
    ) {}

    async linkAccount(userId: string, accountData: ApiKeyAccount | OAuthAccount): Promise<void> {
        await this.accountDBRepo.insertAccount(userId, accountData);
    }

    async getAccountByType(userId: string, accountType: string): Promise<ApiKeyAccount | OAuthAccount> {
        return await this.accountDBRepo.getAccountByType(userId, accountType) as ApiKeyAccount | OAuthAccount;
    }

    async fetchUserLinkedAccountsInfo(userId: string): Promise<Array<Object>> {
        return await this.accountDBRepo.getUserLinkedAccountsByUserId(userId);
    }
}
