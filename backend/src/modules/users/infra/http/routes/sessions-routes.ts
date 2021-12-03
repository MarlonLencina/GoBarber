import { Router } from 'express';
import SessionsController from '../controllers/sessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsController = new SessionsController();

const sessionsRouter = Router();

sessionsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    sessionsController.create,
);

export default sessionsRouter;
