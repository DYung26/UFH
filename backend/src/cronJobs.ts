import { PostgresDatabase } from '@database/PostgreSQL';
import cron from 'node-cron';
import { TokenRepository } from 'repositories/tokenRepository';

const postgresDatabase = new PostgresDatabase();
const tokenDBRepo = new TokenRepository(postgresDatabase);

cron.schedule('0 0 * * *', async () => {
    await tokenDBRepo.cleanUpExpiredTokens();
})
