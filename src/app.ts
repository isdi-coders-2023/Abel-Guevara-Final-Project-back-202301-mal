import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRouter from './api/auth/auth-router.js';
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/', (_req, res) => {
  res.json({ msg: 'My server is up' });
});

app.use(express.json());
app.use('/auth', authRouter);

export default app;
