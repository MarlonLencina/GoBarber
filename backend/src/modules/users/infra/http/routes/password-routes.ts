import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import forgotPasswordController from '../controllers/forgotPasswordController';
import resetPasswordController from '../controllers/resetPasswordController';
const passwordRouter = Router();

const ForgotPasswordController = new forgotPasswordController();
const ResetPasswordController = new resetPasswordController();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    ForgotPasswordController.create,
);
passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    ResetPasswordController.create,
);

export default passwordRouter;
