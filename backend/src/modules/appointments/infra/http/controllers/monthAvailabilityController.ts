import { Request, Response } from 'express';
import listProviderService from '@modules/appointments/services/listProvider-service';
import { container } from 'tsyringe';
import listProviderMonthAvailabilityService from '@modules/appointments/services/listProviderMonthAvailability-service';

class monthAvailabilityController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { provider_id } = req.params;
        const { month, year } = req.query;

        const listProviderMonthAvailability = container.resolve(
            listProviderMonthAvailabilityService,
        );

        const availability = await listProviderMonthAvailability.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return res.json({
            message: 'success',
            availability,
        });
    }
}

export default monthAvailabilityController;

