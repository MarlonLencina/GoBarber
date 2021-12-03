import { Request, Response } from 'express';
import updateProfileService from '@modules/users/services/updateProfileService';
import showProfileService from '@modules/users/services/showProfile-service';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class profileController {
    public async show(req: Request, res: Response): Promise<Response> {
        const userId = req.user;
        const showProfile = container.resolve(showProfileService);
        const user = await showProfile.execute(userId);

        const securedUser = classToClass(user);

        return res.json({ user: securedUser });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const userId = req.user;
        const { name, password, email, oldPassword } = req.body;
        const UpdateProfile = container.resolve(updateProfileService);
        const user = await UpdateProfile.execute({
            name,
            password,
            oldPassword,
            email,
            user_id: userId,
        });

        const securedUser = classToClass(user);

        res.json({
            user: securedUser,
        });
    }
}

export default profileController;
