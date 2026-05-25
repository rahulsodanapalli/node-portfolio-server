import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { sendError } from '../utils/response';
import { env } from '../config/env';

// Extend express Request to attach the admin state
declare global {
  namespace Express {
    interface Request {
      isAdmin?: boolean;
      adminEmail?: string;
    }
  }
}

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // Try cookie first, then fall back to Authorization Bearer header
    let token = req.cookies?.admin_token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    if (!token) {
      return sendError(res, 'Authentication required. No session found.', 401);
    }

    const decoded = verifyToken(token);

    const isGuest = decoded.email === 'guest@rahulbuilds.dev';
    const isAdmin = decoded.email === env.ADMIN_EMAIL;

    if (!isAdmin && !isGuest) {
      return sendError(res, 'Access denied. Unauthorized credentials.', 403);
    }

    req.isAdmin = true;
    req.adminEmail = decoded.email;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired administrative token.', 401);
  }
};

export const requireAdminWrite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (req.adminEmail === 'guest@rahulbuilds.dev') {
    return sendError(res, 'Guest access is read-only. Cannot modify data.', 403);
  }
  next();
};
