import { Router } from 'express';
import { login, logout, getMe } from '../controllers/auth.controller';
import { protectAdmin } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protectAdmin, getMe);

export default router;
