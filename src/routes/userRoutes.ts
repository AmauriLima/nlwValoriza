import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

userRoutes.get('/', ensureAuthenticated, UserController.index);
userRoutes.post('/register', UserController.store);
userRoutes.post('/login', UserController.login);

export { userRoutes };
