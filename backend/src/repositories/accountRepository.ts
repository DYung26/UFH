import { PostgresDatabase } from "@database/PostgreSQL";
import { ApiKeyAccount, OAuthAccount, LinkedAccount } from "models/Account";

export interface IAccountRepository {
    insertAccount(userId: string, accountData: ApiKeyAccount | OAuthAccount): Promise<void>;
    deleteAccount(accountId: string): Promise<void>;
    getAccountByType(userId: string, accountType: string): Promise<ApiKeyAccount | OAuthAccount>;
}

export class AccountRepository {
    private readonly db: PostgresDatabase;

    constructor(db: PostgresDatabase) {
        this.db = db;
    }

    async insertAccount(userId: string, accountData: ApiKeyAccount | OAuthAccount): Promise<void> {
        let query = 'INSERT INTO linked_accounts (id, account_type, linked_at';
	const values = [userId, accountData.accountType, new Date()];
	let valuePlaceholders = '($1, $2, $3';

	if (this.isApiKeyAccount(accountData)) {
            query += ', api_key, api_secret';
	    values.push(accountData.apiKey, accountData.apiSecret);
	    console.log(`***${values}`)
	    valuePlaceholders += `, $${values.length - 1}, $${values.length}`;
	}

	if (this.isOAuthAccount(accountData)) {
            query += ', access_token';
            values.push(accountData.accessToken);
            valuePlaceholders += `, $${values.length}`;
            if (accountData.refreshToken) {
                query += ', refresh_token';
                values.push(accountData.refreshToken);
                valuePlaceholders += `, $${values.length}`;
            }
        }

        query += ') VALUES ' + valuePlaceholders + ')';
	console.log(query);
        await this.db.getPool().query(query, values);
    }

    isApiKeyAccount(account: LinkedAccount): account is ApiKeyAccount {
        return (account as ApiKeyAccount).apiKey !== undefined && (account as ApiKeyAccount).apiSecret !== undefined;
    }

    isOAuthAccount(account: LinkedAccount): account is OAuthAccount {
        return (account as OAuthAccount).accessToken !== undefined;
    }

    async deleteAccount(accountId: string): Promise<void> {
        const query = 'DELETE FROM linked_accounts WHERE id = $1';
	await this.db.getPool().query(query, [accountId]);
    }

    async getAccountByType(userId: string, accountType: string): Promise<ApiKeyAccount | OAuthAccount> {
        const query = 'SELECT * FROM linked_accounts WHERE id = $1 AND account_type = $2';
	const result = await this.db.getPool().query(query, [userId, accountType]);
	const account = result.rows[0];
        return account as ApiKeyAccount | OAuthAccount;
    }
}
