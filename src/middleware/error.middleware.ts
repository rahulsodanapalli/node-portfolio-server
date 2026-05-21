import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { env } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('💥 Runtime Server Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Handle Mongoose cast errors or duplicate keys
  if (err.name === 'CastError') {
    return void sendError(res, `Invalid path resource ID format: ${err.value}`, 400);
  }

  if (err.code === 11000) {
    return void sendError(res, 'Duplicate resource entry detected.', 400);
  }

  sendError(
    res,
    message,
    statusCode,
    env.NODE_ENV === 'development' ? { stack: err.stack } : undefined
  );
};
