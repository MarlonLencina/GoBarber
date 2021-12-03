import { Request, Response } from 'express';
import createAppointmentService from '@modules/appointments/services/createAppointment-service';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

export default class AppointmentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const userID = req.user;
        const { provider_id, date } = req.body;
        const parsedDate = parseISO(date); // parseISO convert to a date Object in js

        const createAppointment = container.resolve(createAppointmentService);

        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate,
            user_id: userID,
        });

        return res.json({
            message: 'success',
            appointment,
        });
    }
}
