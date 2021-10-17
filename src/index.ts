import express from 'express';
import 'reflect-metadata';
import 'express-async-errors';

import './database';
import { routes } from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));
