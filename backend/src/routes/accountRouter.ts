import { AccountController } from "controllers/accountController";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { authenticateToken } from "middlewares";
import { accountDBRepo } from "repositories";
import { AccountService } from "services/accountService";


const accountRouter = Router();
const accountService = new AccountService(accountDBRepo);
const accountController = new AccountController(accountService);

accountRouter.post(
    '/link',
    authenticateToken,
    expressAsyncHandler(accountController.linkAccount.bind(accountController))
)

export default accountRouter;
