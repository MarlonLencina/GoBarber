import { Router } from 'express';
import profileController from '../controllers/profileController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const profileRouter = Router();
const ProfileController = new profileController();

profileRouter.get('/', ensureAuthenticated, ProfileController.show);
profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            oldPassword: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    ensureAuthenticated,
    ProfileController.update,
);

export default profileRouter;

