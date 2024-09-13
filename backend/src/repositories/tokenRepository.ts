import { PostgresDatabase } from "@database/PostgreSQL"

export interface ITokenRepository {
    blacklistToken(token: string, expiry: number): Promise<void>;
    isTokenBlacklisted(token: string): Promise<boolean>;
}

export class TokenRepository {
    private readonly db: PostgresDatabase;

    constructor(db: PostgresDatabase) {
        this.db = db;
    }

    async blacklistToken(token: string, expiry: number): Promise<void> {
	const timestamp = new Date(expiry * 1000).toISOString();
        const query = 'INSERT INTO blacklisted_tokens (token, expiry) VALUES ($1, $2)';
        await this.db.getPool().query(query, [token, timestamp]);
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        const query = 'SELECT 1 FROM blacklisted_tokens WHERE token = $1 AND expiry > CURRENT_TIMESTAMP';
	const result = await this.db.getPool().query(query, [token]);
	if (result.rowCount) {
	    return result.rowCount > 0;
	}
	return false;
    }

    async cleanUpExpiredTokens(){
        await this.db.getPool().query(
        'DELETE FROM blacklisted_tokens WHERE expiry < CURRENT_TIMESTAMP'
        );
        console.log('Expired tokens cleaned up');
    }
}
