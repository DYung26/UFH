import { CustomError } from "@utils/customError";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { BalanceService } from "services/balanceService";
import { jsonResponse } from "@utils/Response";

export class BalanceController {
    constructor(
	    private readonly balanceService: BalanceService) {}

    getBalance: RequestHandler = async (req: Request, res: Response) => {
        const user = req.user;
	const accountType = req.query.accountType as string;
	console.log(accountType);
	if (!user) {
            throw new CustomError('User not found', StatusCodes.NOT_FOUND);
	}
	const userId = user.id;
	const balance = await this.balanceService.getBalance(userId, accountType);
	return jsonResponse(res, StatusCodes.OK, 'Balance retrieved successfully', { balance });
    }
}
