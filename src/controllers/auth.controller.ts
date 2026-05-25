import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { sendSuccess, sendError } from '../utils/response';
import { sendTokenCookie, clearTokenCookie } from '../utils/jwt';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    const isGuest = email === 'guest@rahulbuilds.dev' && password === 'guest123';
    const isAdmin = email === env.ADMIN_EMAIL && password === env.ADMIN_PASSWORD;

    if (!isAdmin && !isGuest) {
      return sendError(res, 'Invalid administrative credentials', 401);
    }

    // Sign JWT and set in HttpOnly cookie
    const token = sendTokenCookie(res, email);

    return sendSuccess(res, { isAdmin: true, email, token }, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    clearTokenCookie(res);
    return sendSuccess(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // If the req passed protectAdmin, req.isAdmin is true
    if (req.isAdmin && req.adminEmail) {
      return sendSuccess(res, { isAdmin: true, email: req.adminEmail });
    }
    return sendError(res, 'Not authenticated', 401);
  } catch (error) {
    next(error);
  }
};
