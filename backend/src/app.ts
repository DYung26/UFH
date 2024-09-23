import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import hpp from 'hpp';
import CONFIG from './config';
import helmet from 'helmet';
import cors from 'cors';
import authRouter from './routes/authRouter';
// import { authenticateToken } from 'middlewares';
import { db } from './database';
import { catchAllErrorHandler, notFoundErrorHandler } from 'middlewares/errorHandlerMiddleware';
import './cronJobs';
import accountRouter from './routes/accountRouter';
import balanceRouter from './routes/balanceRouter';
import './services/bankIntegrations/cryptoExchanges/bybit';

const app = express();

const corsOptions = {
	origin: true, // [ ]
    optionsSuccessStatus: 200,
    credentials: true
};

if (CONFIG.ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(helmet());
app.use(cors(corsOptions));
app.use(hpp());
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));
// app.use(session(sessionOptions));

const port = CONFIG.PORT;

app.get('/', (_: Request, res: Response) => {
    res.send('Hello, and Welcome to UFH home route!');
});

// app.use('/api/auth/', authRouter);
app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/balance', balanceRouter);
app.use(notFoundErrorHandler);
app.use(catchAllErrorHandler);

let server;

db.connect().then(
    () => {
        server = app.listen(port, () => {
            console.log(
                'UFH is running at http://localhost:%d in %s mode',
		port,
		app.get('env')
            );
	});
    },
    () => {
        console.log('Could not connect to PostgreSQL');
    }
);

export default server;

