import { Request, Response, NextFunction } from 'express';

function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  response.status(500).json({
    error: 'Internal Server Error',
  });
  next();
}

export default errorHandler;
