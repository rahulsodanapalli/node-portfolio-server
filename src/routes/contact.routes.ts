import { Router } from 'express';
import {
  submitContactForm,
  getContactMessages,
  deleteContactMessage,
} from '../controllers/contact.controller';
import { protectAdmin, requireAdminWrite } from '../middleware/auth.middleware';

const router = Router();

// Public submission endpoint
router.post('/', submitContactForm);

// Protected admin log directory access
router.get('/', protectAdmin, getContactMessages);

// Protected admin delete gate
router.delete('/:id', protectAdmin, requireAdminWrite, deleteContactMessage);

export default router;
