import { Router } from 'express';
import { complimentRoutes } from './complimentRoutes';
import { tagRoutes } from './tagRoutes';
import { userRoutes } from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/tags', tagRoutes);
router.use('/compliments', complimentRoutes);

export { router as routes };
