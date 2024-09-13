import { BalanceController } from "controllers/balanceController";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticateToken } from "middlewares";
import { accountDBRepo } from "repositories";
import { BalanceService } from "services/balanceService";

const balanceRouter = Router();
const balanceService = new BalanceService(accountDBRepo);
const balanceController = new BalanceController(balanceService);

balanceRouter.get(
   '/',
   authenticateToken,
   expressAsyncHandler(balanceController.getBalance.bind(balanceController))
)

export default balanceRouter;

