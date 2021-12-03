import { Request, Response } from 'express';
import userRepository from '../../typeorm/repository/userRepositories';
import authValidation from '@modules/users/services/authValidation-service';
import { container } from 'tsyringe';
import { classToClass, serialize } from 'class-transformer';

export default class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        console.log(req.body);
        const { email, password } = req.body;
        const authenticateUser = container.resolve(authValidation);
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        console.log(token);

        const securedUser = classToClass(user);

        return res.json({
            message: 'logged in succesfully',
            user: securedUser,
            token,
        });
    }
}
