import { jsonResponse } from "@utils/Response";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AccountService } from "services/accountService";
import { Request, Response } from "express";
import { CustomError } from "@utils/customError";


export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    linkAccount: RequestHandler = async (req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            throw new CustomError('User not found', StatusCodes.NOT_FOUND);
	}
	const userId = req.user.id;
	const accountData = req.body;
	console.log(accountData);
        accountData["linkedAt"] = new Date();
	await this.accountService.linkAccount(userId, accountData);
	return jsonResponse(res, StatusCodes.OK, 'Account linked successfully');
    }

    getUserLinkedAccounts: RequestHandler = async(req: Request, res: Response) => {
        const user = req.user;
        if (!user) {
            throw new CustomError('User not found', StatusCodes.NOT_FOUND);
        }
        const userId = user.id;
        const accountsData = await this.accountService.fetchUserLinkedAccountsInfo(userId);
	return jsonResponse(res, StatusCodes.OK, 'Accounts retrieved successfully', accountsData);
    }
}
