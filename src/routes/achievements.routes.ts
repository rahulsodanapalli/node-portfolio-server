import { Router } from 'express';
import { getAchievements, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievements.controller';
import { protectAdmin, requireAdminWrite } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { achievementValidationSchema } from '../validators/skill.validator';

const router = Router();

router.get('/', getAchievements);
router.post('/', protectAdmin, requireAdminWrite, validateBody(achievementValidationSchema), createAchievement);
router.put('/:id', protectAdmin, requireAdminWrite, validateBody(achievementValidationSchema), updateAchievement);
router.delete('/:id', protectAdmin, requireAdminWrite, deleteAchievement);

export default router;
