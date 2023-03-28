import { Request, Response, NextFunction } from 'express';
import AppErr from '../utility/AppError';

export const globalErrorHandler = (err: AppErr, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500
    let status = err.status  || "fail"
  
    res.status(statusCode).json({
        statusCode: statusCode,
        status: status,
    })
  }