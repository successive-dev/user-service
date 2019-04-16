import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  next({
    error: 'Not Found',
    message: 'Route not found',
    status: 404,
  });
};
