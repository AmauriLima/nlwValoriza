import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { complimentRoutes } from './complimentRoutes';
import { tagRoutes } from './tagRoutes';
import { userRoutes } from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/tags', ensureAuthenticated, tagRoutes);
router.use('/compliments', ensureAuthenticated, complimentRoutes);

export { router as routes };
