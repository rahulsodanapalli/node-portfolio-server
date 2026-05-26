import { z } from 'zod';

export const skillValidationSchema = z.object({
  name: z.string().min(1, 'Skill name is required').trim(),
  category: z.string().min(1, 'Category is required').trim(),
  level: z.string().optional(),
});
