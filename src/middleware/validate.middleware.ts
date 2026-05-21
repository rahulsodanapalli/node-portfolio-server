import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { sendError } from '../utils/response';

export const validateBody = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const parsed = await schema.safeParseAsync(req.body);
      
      if (!parsed.success) {
        return sendError(
          res,
          'Schema validation failed',
          400,
          parsed.error.flatten().fieldErrors
        );
      }
      
      req.body = parsed.data;
      next();
    } catch (error) {
      next(error);
    }
  };
};
