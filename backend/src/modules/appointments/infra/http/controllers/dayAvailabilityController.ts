import { Request, Response } from 'express';
import listProviderService from '@modules/appointments/services/listProvider-service';
import { container } from 'tsyringe';
import listProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailability';

export default class DayAvailabilityController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { provider_id } = req.params;
        const { day, month, year } = req.query;

        const listProviderDayAvailability = container.resolve(
            listProviderDayAvailabilityService,
        );

        const availability = await listProviderDayAvailability.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return res.json({
            message: 'success',
            availability,
        });
    }
}
