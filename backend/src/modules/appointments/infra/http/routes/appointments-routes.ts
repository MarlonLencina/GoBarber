import { Router } from 'express';
import appointment from '@modules/appointments/infra/typeorm/entities/appointments-model';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/appointmentController';
import ProviderAppointmentsController from '../controllers/providersAppointmentsController';

import { celebrate, Segments, Joi } from 'celebrate';

const appointmentsRouter = Router();
const providersAppointmentsController = new ProviderAppointmentsController();
const appointmentsController = new AppointmentsController();

appointmentsRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.string(),
        },
    }),
    appointmentsController.create,
);

appointmentsRouter.get(
    '/me',
    ensureAuthenticated,
    providersAppointmentsController.index,
);

/* appointmentsRouter.get('/', ensureAuthenticated, async (req, res) => {
    const appointments = await AppointmentsRepository.find();

    res.json({
        appointments,
    });
}); */

export default appointmentsRouter;
