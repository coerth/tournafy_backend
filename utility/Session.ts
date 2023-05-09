import { Request, Response, NextFunction } from 'express';
import { Session } from '../types/types';

export const sessionMiddleware = (request: Request, response: Response, next: NextFunction) => {
    request.session = new Session(request, response);
    next();
}