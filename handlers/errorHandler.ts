import { Request, Response, NextFunction } from 'express';
import AppErr from '../utility/AppError';
import logger from "../utility/Logger"

export const globalErrorHandler = (err: AppErr, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500
    let status = err.message  || "fail"

    logger.error(err)
  
    res.status(statusCode).json({
        statusCode: statusCode,
        status: status,
    })
  }