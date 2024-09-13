import { StatusCodes } from "http-status-codes";
import { User } from "models/User";
import { QueryResult } from 'pg';
import bcrypt from 'bcrypt';
import { CustomError } from "@utils/customError";
import { hashPassword } from "@utils/passwordUtils";
import { PostgresDatabase } from "@database/PostgreSQL";

export interface IUserRepository {
    createUser(email: string, password: string, usernamme: string): Promise<User>;
    getUserByEmailAndPassword(email: string, password: string): Promise<User>;
    getUserById(userId: string): Promise<User>;
}

export class UserRepository {
    private readonly db: PostgresDatabase;

    constructor(db: PostgresDatabase) {
        this.db = db;
    }

    async createUser(email: string, password: string, username: string): Promise<User> {
        const existingUser = await this.getUserByEmail(email);
	if (existingUser) {
            throw new CustomError('User with this email already exists', StatusCodes.CONFLICT);
	}

	const hashedPassword = await hashPassword(password);
	const query = `
            INSERT INTO users (email, password, username, created_at, updated_at)
	    VALUES ($1, $2, $3, NOW(), NOW())
	    RETURNING id, email, username, created_at, updated_at
	`;
	const values = [email, hashedPassword, username];
	const result = await this.db.getPool().query(query, values);

	const user: User = {
            id: result.rows[0].id,
	    email: result.rows[0].email,
	    username: result.rows[0].username,
	    password: hashedPassword,
	    createdAt: result.rows[0].created_at,
	    updatedAt: result.rows[0].updated_at,
	};

	return user as User;
    }

    async getUserByEmail(email: string): Promise<User> {
        const query = 'SELECT  FROM users WHERE email = $1';
	const result: QueryResult = await this.db.getPool().query(query, [email]);
	const user = result.rows[0] as User;
	return user as User;
    }

    async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result: QueryResult = await this.db.getPool().query(query, [email]);

        if (result.rows.length === 0) {
            throw new CustomError('Invalid email or password', StatusCodes.UNAUTHORIZED);
        }

        const user = result.rows[0] as User;
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new CustomError('Invalid email or password', StatusCodes.UNAUTHORIZED);
        }
	return user as User;
    }

    async getUserById(userId: string): Promise<User> {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result: QueryResult = await this.db.getPool().query(query, [userId]);
        if (result.rows.length === 0) {
            throw new CustomError('Invalid token or token is expired', StatusCodes.UNAUTHORIZED);
        }
        const user = result.rows[0] as User;
        return user as User;
    }
}

