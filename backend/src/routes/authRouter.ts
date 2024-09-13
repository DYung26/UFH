import { AuthController } from 'controllers/authController';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { authenticateToken } from 'middlewares/authMiddleware';
import { AuthService } from 'services/authService';
import { tokenDBRepo, userDBRepo } from 'repositories';

const authRouter = Router();
const authService = new AuthService(userDBRepo,tokenDBRepo);
const authController = new AuthController(authService);

authRouter.post(
    '/login',
    expressAsyncHandler(authController.loginUser.bind(authController))
)

authRouter.post(
    '/register',
    expressAsyncHandler(authController.registerUser.bind(authController))
)

authRouter.get(
    '/profile',
    authenticateToken,
    expressAsyncHandler(authController.getProfile.bind(authController))
)

authRouter.post(
    '/logout',
    authenticateToken,
    expressAsyncHandler(authController.logoutUser.bind(authController))
)

export default authRouter;

