import { z } from 'zod';

export const achievementValidationSchema = z.object({
  title: z.string().min(1, 'Achievement title is required').trim(),
  desc: z.string().min(1, 'Achievement description is required').trim(),
  date: z.string().optional(),
});
