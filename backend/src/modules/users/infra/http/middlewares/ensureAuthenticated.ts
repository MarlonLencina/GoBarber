import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import config from '@config/configAuth';

interface tokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

const ensureAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing.', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, config.jwt.secret);
        const { sub } = decoded as tokenPayload;
        req.user = sub;
    } catch (error) {
        throw new AppError('Invalid JWT token.', 401);
    }

    return next();
};

export default ensureAuthenticated;
