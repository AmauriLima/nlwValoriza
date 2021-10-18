import { Router } from 'express';
import ComplimentController from '../app/controllers/ComplimentController';

const complimentRoutes = Router();

complimentRoutes.post('/', ComplimentController.store);
complimentRoutes.get('/send', ComplimentController.indexSendCompliments);
complimentRoutes.get('/receive', ComplimentController.indexReceiveCompliments);

export { complimentRoutes };
