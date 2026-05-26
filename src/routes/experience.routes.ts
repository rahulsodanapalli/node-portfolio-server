import { Router } from 'express';
import { getExperiences, createExperience, updateExperience, deleteExperience } from '../controllers/experience.controller';
import { protectAdmin, requireAdminWrite } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { experienceValidationSchema } from '../validators';

const router = Router();

router.get('/', getExperiences);
router.post('/', protectAdmin, requireAdminWrite, validateBody(experienceValidationSchema), createExperience);
router.put('/:id', protectAdmin, requireAdminWrite, validateBody(experienceValidationSchema), updateExperience);
router.delete('/:id', protectAdmin, requireAdminWrite, deleteExperience);

export default router;
