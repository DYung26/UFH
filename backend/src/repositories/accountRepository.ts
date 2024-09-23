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
	const values = [userId, accountData.account_type, new Date()];
	let valuePlaceholders = '($1, $2, $3';

	if (this.isApiKeyAccount(accountData)) {
            query += ', api_key, api_secret';
	    values.push(accountData.api_key, accountData.api_secret);
	    console.log(`***${values}`)
	    valuePlaceholders += `, $${values.length - 1}, $${values.length}`;
	}

	if (this.isOAuthAccount(accountData)) {
            query += ', access_token';
            values.push(accountData.access_token);
            valuePlaceholders += `, $${values.length}`;
            if (accountData.refresh_token) {
                query += ', refresh_token';
                values.push(accountData.refresh_token);
                valuePlaceholders += `, $${values.length}`;
            }
        }

        query += ') VALUES ' + valuePlaceholders + ')';
	console.log(query);
        await this.db.getPool().query(query, values);
    }

    isApiKeyAccount(account: LinkedAccount): account is ApiKeyAccount {
        return (account as ApiKeyAccount).api_key !== undefined && (account as ApiKeyAccount).api_secret !== undefined;
    }

    isOAuthAccount(account: LinkedAccount): account is OAuthAccount {
        return (account as OAuthAccount).access_token !== undefined;
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

    async getUserLinkedAccountsByUserId(userId: string): Promise<Array<Object>> {
        const query = `
            SELECT
                account_type,
                linked_at,
                CASE 
                    WHEN "api_key" IS NOT NULL AND "api_secret" IS NOT NULL 
                        THEN json_build_object('apiKey', "api_key", 'apiSecret', "api_secret")
                    WHEN "access_token" IS NOT NULL AND "refresh_token" IS NOT NULL 
                        THEN json_build_object('accessToken', "access_token", 'refreshToken', "refresh_token")
                    ELSE NULL
                END AS credentials
            FROM linked_accounts
            WHERE id = $1
        `;
	const result = await this.db.getPool().query(query, [userId]);
	const accounts = result.rows;
	return accounts as Array<Object>;
    }
}
