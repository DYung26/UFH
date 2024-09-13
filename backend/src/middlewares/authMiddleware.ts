import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/customError';
import { UserRequestData } from 'index';
import CONFIG from 'config';
import { TokenRepository } from 'repositories/tokenRepository';
import { PostgresDatabase } from '@database/PostgreSQL';

export const authenticateToken = async (req: Request, _: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new CustomError(
            'Authorization token is missing',
            StatusCodes.BAD_REQUEST
        );
    }

    try {
        const postgresDatabase = new PostgresDatabase();
        const tokenDBRepo = new TokenRepository(postgresDatabase);
        if (await tokenDBRepo.isTokenBlacklisted(token)) {
            return next(new CustomError(
                'Token is blacklisted',
	        StatusCodes.UNAUTHORIZED
	    ));
        }

        const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as UserRequestData;

        // console.log(decoded);
        if (!decoded.id) { // || !decoded.username) {
            return next(new CustomError(
                'Unable to verify token, login required',
                StatusCodes.UNAUTHORIZED
            ));
        }
        req.user = decoded;
        req.token = token;
        console.log(req.user);
        next();
    } catch (error) {
        return next(new CustomError(
            'Unable to verify token, login required',
    	    StatusCodes.UNAUTHORIZED
        ));
    }
};


