import { Request, Response } from 'express';
import updateUserAvatarService from '@modules/users/services/updateUserAvatarService';
import { container, inject } from 'tsyringe';
import IStorageProvider from '@modules/users/providers/storageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

export default class AvatarController {
    constructor() {}

    public async create(req: Request, res: Response): Promise<Response> {
        const UpdateUserAvatarService = container.resolve(
            updateUserAvatarService,
        );

        const user_id = req.user;

        const user = await UpdateUserAvatarService.execute({
            user_id,
            avatarFileName: req.file?.filename,
        });

        
        const securedUser = classToClass(user)

        return res.json({
            message: 'succesfull upload.',
            user: securedUser,
        });
    }
}
