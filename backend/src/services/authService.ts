import { CustomError } from "@utils/customError";
import { StatusCodes } from "http-status-codes";
import { UserProfile } from "models/User";
import { TokenRepository } from "repositories/tokenRepository";
import { UserRepository } from "repositories/userRepository";

export interface IAuthService {
    register(email: string, password: string, username: string): Promise<UserProfile>;
    login(email: string, password: string): Promise<UserProfile>;
    getProfile(userId: string): Promise<UserProfile>;
}

export class AuthService implements IAuthService {
    constructor(
        private readonly userDBRepo: UserRepository,
	private readonly tokenDBRepo: TokenRepository,
    ) {}

    async register(email: string, password: string, username: string): Promise<UserProfile> {
        const user = await this.userDBRepo.createUser(email, password, username);
        if (!user) {
            throw new CustomError('Failed to create user', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const { password: userPassword, ...userWithoutPassword } = user;
        return userWithoutPassword as UserProfile;
    }

    async login(email: string, password: string): Promise<UserProfile> {
        const user = await this.userDBRepo.getUserByEmailAndPassword(email, password);
        if (!user) {
            throw new CustomError('User does not exist', StatusCodes.NOT_FOUND);
        }
        const { password: userPassword, ...userWithoutPassword } = user;
        return userWithoutPassword as UserProfile;
    }

    async getProfile(userId: string): Promise<UserProfile> {
        const user = await this.userDBRepo.getUserById(userId);
        if (!user) {
            throw new CustomError('User does not exist', StatusCodes.NOT_FOUND);
        }
        const { password: userPassword, ...userWithoutPassword } = user;
        return userWithoutPassword as UserProfile;
    }

    async logout(token: string, expiry: number): Promise<void> {
        await this.tokenDBRepo.blacklistToken(token, expiry);
    }
}

