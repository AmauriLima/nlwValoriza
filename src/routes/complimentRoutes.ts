import { Router } from 'express';
import ComplimentController from '../app/controllers/ComplimentController';

const complimentRoutes = Router();

complimentRoutes.post('/', ComplimentController.store);

export { complimentRoutes };
