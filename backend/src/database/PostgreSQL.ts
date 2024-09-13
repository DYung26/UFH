import { Pool, PoolClient } from 'pg';
import config from '../config';

export class PostgresDatabase {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: config.DATABASE.DB_USER,
            host: config.DATABASE.DB_HOST,
            database: config.DATABASE.DB_NAME,
            password: config.DATABASE.DB_PASSWORD,
            port: parseInt(config.DATABASE.DB_PORT || '5432'),
        });
    }

    getPool(): Pool {
        return this.pool;
    }

    async connect(): Promise<void> {
        try {
            await this.pool.connect();
            console.log('Database connected');
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        try {
            await this.pool.end();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
            throw error;
        }
    }

    async startTransaction(): Promise<PoolClient> {
        const client = await this.pool.connect();
        await client.query('BEGIN');
        return client;
    }

    async commitTransaction(client: PoolClient): Promise<void> {
        try {
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async rollbackTransaction(client: PoolClient): Promise<void> {
        try {
            await client.query('ROLLBACK');
        } finally {
            client.release();
        }
    }
}

