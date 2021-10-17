import { NextFunction, Request, Response } from 'express';

function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const admin = true;

  return admin
    ? next()
    : response.status(401).json({
      error: 'Unauthorized user',
    });
}

export default ensureAdmin;
