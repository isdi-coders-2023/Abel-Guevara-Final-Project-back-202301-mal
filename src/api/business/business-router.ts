import express from 'express';
import { validate } from 'express-validation';
import { authMiddleware } from '../auth/auth-middleware.js';
import {
  createBusinessController,
  deleteBusinessByIdController,
  getBusinessByIdController,
  getBusinessController,
} from './business-controller.js';
import businessValidation from './business-validation.js';
import { upload } from './image-upload-middleware.js';
import { supabaseMiddleware } from './supabase-middleware.js';

const router = express.Router();
router.use(validate(businessValidation, {}, {}));
router
  .route('/')
  .get(getBusinessController)
  .post(
    authMiddleware,
    upload.single('profile'),
    supabaseMiddleware,
    createBusinessController,
  );

router
  .route('/:id')
  .get(getBusinessByIdController)
  .delete(deleteBusinessByIdController);

export default router;
