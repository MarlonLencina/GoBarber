import { Request, Response } from 'express';
import listProviderService from '@modules/appointments/services/listProvider-service';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class ProvidersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { user_id } = req.body;

        const listProvider = container.resolve(listProviderService);

        const providers = await listProvider.execute({
            except_UserID: user_id,
        });

        return res.json({
            message: 'success',
            providers: classToClass(providers),
        });
    }
}
