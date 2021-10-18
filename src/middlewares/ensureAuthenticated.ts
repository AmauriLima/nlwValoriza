import {
  Request, Response, NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';

interface IDecodedUser {
  sub: string,
  email: string,
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ error: 'No token provided' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ error: 'Token malformatted' });
  }

  jwt.verify(token, '139334c4423daf8485c1d9d2bc93ae169592a304', (error: Error, decoded: IDecodedUser) => {
    if (error) {
      return response.status(401).json({ error: 'Invalid token' });
    }
    const { sub } = decoded;
    request.user_id = sub;
  });

  next();
}
