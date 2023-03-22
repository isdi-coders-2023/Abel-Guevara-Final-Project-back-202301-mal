import express from 'express';
import { authMiddleware } from '../auth/auth-middleware.js';
import { createBusinessController } from './business-controller.js';
import { upload } from './image-upload-middleware.js';
import { supabaseMiddleware } from './supabase-middleware.js';

const router = express.Router();

router
  .route('/')
  .post(
    authMiddleware,
    upload.single('profile'),
    supabaseMiddleware,
    createBusinessController,
  );

export default router;
