import { Express } from "express";

interface UserRequestData {
    id: string;
    exp: number;
    // username: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user: UserRequestData;
	token: string;
    }
}

