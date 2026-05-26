import { z } from 'zod';

const projectSpecValidationSchema = z.object({
  challenge: z.string().min(1, 'Challenge details are required').trim(),
  solution: z.string().min(1, 'Solution details are required').trim(),
  architecture: z.string().min(1, 'Architecture explanation is required').trim(),
  performance: z.string().min(1, 'Performance benchmark is required').trim(),
  tech: z.array(z.string().min(1)).min(1, 'At least one specification tech tag is required'),
  impact: z.string().min(1, 'Business impact metrics are required').trim(),
});

export const projectValidationSchema = z.object({
  title: z.string().min(1, 'Project title is required').trim(),
  subtitle: z.string().min(1, 'Project subtitle is required').trim(),
  category: z.string().min(1, 'Project category is required').trim(),
  desc: z.string().min(1, 'Project description is required').trim(),
  imageMockup: z.string().min(1, 'Image mockup identifier is required').trim(),
  specs: projectSpecValidationSchema,
});
