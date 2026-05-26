import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projects.controller';
import { protectAdmin, requireAdminWrite } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validate.middleware';
import { projectValidationSchema } from '../validators';

const router = Router();

router.get('/', getProjects);
router.post('/', protectAdmin, requireAdminWrite, validateBody(projectValidationSchema), createProject);
router.put('/:id', protectAdmin, requireAdminWrite, validateBody(projectValidationSchema), updateProject);
router.delete('/:id', protectAdmin, requireAdminWrite, deleteProject);

export default router;
