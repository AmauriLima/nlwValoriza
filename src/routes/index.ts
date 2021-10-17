import { Router } from 'express';
import { tagRoutes } from './tagRoutes';
import { userRoutes } from './userRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/tags', tagRoutes);

export { router as routes };
