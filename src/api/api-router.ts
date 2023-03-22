import express from 'express';
import businessRouter from './business/business-router.js';
const router = express.Router();

router.use('/business', businessRouter);

export default router;
