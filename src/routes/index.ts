import { Router } from 'express';
import authRoutes from './auth.routes';
import skillsRoutes from './skills.routes';
import experienceRoutes from './experience.routes';
import projectsRoutes from './projects.routes';
import achievementsRoutes from './achievements.routes';
import contactRoutes from './contact.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/skills', skillsRoutes);
apiRouter.use('/experience', experienceRoutes);
apiRouter.use('/projects', projectsRoutes);
apiRouter.use('/achievements', achievementsRoutes);
apiRouter.use('/contact', contactRoutes);

export default apiRouter;
