import { Router } from 'express';
import appointment from '@modules/appointments/infra/typeorm/entities/appointments-model';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/providerController';
import monthAvailabilityController from '../controllers/monthAvailabilityController';
import DayAvailabilityController from '../controllers/dayAvailabilityController';
import ProviderAppointmentsController from '../controllers/providersAppointmentsController';

import { celebrate, Segments, Joi } from 'celebrate';

const providersRouter = Router();
const providersController = new ProvidersController();
const monthAvailability = new monthAvailabilityController();
const dayAvailability = new DayAvailabilityController();

providersRouter.get('/', providersController.index);
providersRouter.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    monthAvailability.index,
);
providersRouter.get(
    '/:provider_id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    dayAvailability.index,
);

export default providersRouter;
