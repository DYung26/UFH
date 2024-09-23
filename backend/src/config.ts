import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const env = dotenv.parse(fs.readFileSync(__dirname + '/../.env'));

const CONFIG = {
    JWT_SECRET: env.JWT_SECRET,
    PORT: env.PORT,
    ENV: env.ENV,
    DATABASE: {
        DB_URI: env.DB_URI,
	DB_USER: env.DB_USER,
	DB_HOST: env.DB_HOST,
        DB_NAME: env.DB_NAME,
	DB_PASSWORD: env.DB_PASSWORD,
	DB_PORT: env.DB_PORT
    },
    PROXY: {
        HTTP_PROXY: env.HTTP_PROXY,
	HTTPS_PROXY: env.HTTP_PROXY
    },
    CRYPTO: {
        BYBIT: {
            API_KEY: env.BYBIT_KEY,
	    API_SECRET: env.BYBIT_SECRET,
	},
	BINANCE: {
            API_KEY: env.BINANCE_KEY,
	    API_SECRET: env.BINANCE_SECRET,
	}
    }
};

export default CONFIG;

