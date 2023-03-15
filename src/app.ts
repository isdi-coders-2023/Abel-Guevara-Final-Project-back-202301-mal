import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './api/auth/auth-router.js';
import { errorHandler } from './utils/error-handler.js';
const app = express();

app.use(bodyParser.json());

app.get('/', (_req, res) => {
  res.json({ msg: 'My server is up' });
});
app.use(cors());

app.use(express.json());

app.disable('x-powered-by');

app.use('/auth', authRouter);

app.use(errorHandler);

export default app;
