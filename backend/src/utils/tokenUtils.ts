import CONFIG from 'config';
import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
    const secretKey = CONFIG.JWT_SECRET; // Use a secure secret
    const token = jwt.sign({ id: userId }, secretKey, {
        expiresIn: '15m', // Token expires in 15 minutes
    });
    return token;
};

