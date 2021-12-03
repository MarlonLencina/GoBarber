import { Request, Response } from 'express';
import listProviderService from '@modules/appointments/services/listProvider-service';
import listProviderAppointmentsInDay from '@modules/appointments/services/listProviderAppointments-service';
import { container } from 'tsyringe';

export default class providerAppointmentsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const provider_id = req.user;
        const { day, month, year } = req.query;

        const listProvider = container.resolve(listProviderAppointmentsInDay);

        const providers = await listProvider.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return res.json({
            message: 'success',
            providers,
        });
    }
}
