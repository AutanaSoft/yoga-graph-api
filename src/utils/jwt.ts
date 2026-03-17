import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface DecodedToken {
  userId: string;
}

export const signToken = (payload: DecodedToken): string => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
    return decoded;
  } catch {
    return null;
  }
};
