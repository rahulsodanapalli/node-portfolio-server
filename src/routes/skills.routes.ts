import { Router } from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../controllers/skills.controller';
import { protectAdmin, requireAdminWrite } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { skillValidationSchema } from '../validators/skill.validator';

const router = Router();

router.get('/', getSkills);
router.post('/', protectAdmin, requireAdminWrite, validateBody(skillValidationSchema), createSkill);
router.put('/:id', protectAdmin, requireAdminWrite, validateBody(skillValidationSchema), updateSkill);
router.delete('/:id', protectAdmin, requireAdminWrite, deleteSkill);

export default router;
