import express from 'express';
import 'reflect-metadata';

import './database';
import { routes } from './routes';

const app = express();

app.use('/', routes);

app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));
