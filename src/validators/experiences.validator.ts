import { z } from 'zod';

export const experienceValidationSchema = z.object({
  role: z.string().min(1, 'Role is required').trim(),
  company: z.string().min(1, 'Company is required').trim(),
  location: z.string().min(1, 'Location is required').trim(),
  period: z.string().min(1, 'Period is required').trim(),
  details: z.array(z.string().min(1)).min(1, 'At least one detail item is required'),
  tech: z.array(z.string().min(1)).min(1, 'At least one technology tag is required'),
});
