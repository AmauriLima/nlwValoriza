import { Router } from 'express';
import TagController from '../app/controllers/TagController';
import ensureAdmin from '../middlewares/ensureAdmin';

const tagRoutes = Router();

tagRoutes.post('/', ensureAdmin, TagController.store);

export { tagRoutes };
