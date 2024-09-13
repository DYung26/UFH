import { Request, Response } from "express";
import { jsonResponse } from "@utils/Response";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "services/authService";
import { CustomError } from "@utils/customError";
import { generateToken } from "@utils/tokenUtils";

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    registerUser: RequestHandler = async (req: Request, res: Response) => {
        const { email, password, username } = req.body;
        const user = await this.authService.register(email, password, username);
	const token = generateToken(user.id);
        return jsonResponse(res, StatusCodes.OK, 'User created successfully', { user, token });
    }

    loginUser: RequestHandler = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await this.authService.login(email, password);
        const token = generateToken(user.id);
        return jsonResponse(res, StatusCodes.OK, 'Login successful', { user, token });
    }

    getProfile: RequestHandler = async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            throw new CustomError('User not found', StatusCodes.NOT_FOUND);
        }
        const existingUser = await this.authService.getProfile(user.id);
        return jsonResponse(res, StatusCodes.OK, 'User profile retrieved successfully', { existingUser });
    }

    logoutUser: RequestHandler = async (req: Request, res: Response) => {
        const user = req.user;
	const token = req.token;
	await this.authService.logout(token, user.exp);
	return jsonResponse(res, StatusCodes.OK, 'Logged out successfully')
    }
}

