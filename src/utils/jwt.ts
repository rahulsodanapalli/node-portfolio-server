import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { env } from '../config/env';

export interface JwtPayload {
  email: string;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '24h',
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};

export const sendTokenCookie = (res: Response, email: string): string => {
  const token = signToken({ email });
  
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    secure: true,
    sameSite: 'none' as const,
  };

  res.cookie('admin_token', token, cookieOptions);
  return token;
};

export const clearTokenCookie = (res: Response): void => {
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
  });
};
