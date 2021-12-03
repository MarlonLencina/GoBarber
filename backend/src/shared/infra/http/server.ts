import express, { Request, Response, NextFunction } from 'express';
import raterLimit from './middlewares/raterLimit';
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';
import routes from './routes/index';
import 'reflect-metadata';
import cors from 'cors';

import '@shared/container/index';

import '@shared/infra/typeorm/index';
import AppError from '../../errors/AppError';

import { errors } from 'celebrate';

const app = express();
app.use(cors());
app.use(raterLimit);
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    res.status(500).json({
        message: 'Internal server error...',
        error: err.message,
        stack: err.stack,
    });
});

app.listen(3333, () => {
    console.log(`server started on 3333 ❤👍`);
});
