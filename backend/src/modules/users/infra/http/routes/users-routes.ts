import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/usersController';
import { celebrate, Joi, Segments } from 'celebrate';
import AvatarController from '../controllers/avatarController';
import multer from 'multer';
import UploadConfig from '@config/upload';

const upload = multer(UploadConfig.multer);

const usersRouter = Router();
const usersController = new UsersController();

const avatarController = new AvatarController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    avatarController.create,
);

export default usersRouter;
