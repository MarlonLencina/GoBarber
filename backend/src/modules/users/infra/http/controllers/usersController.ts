import { Request, Response } from 'express';
import userRepository from '../../typeorm/repository/userRepositories';
import createUserService from '@modules/users/services/createUser-service';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;

        const createuserservice = container.resolve(createUserService);
        const user = await createuserservice.execute({ name, email, password });
        console.log(user);

        const securedUser = classToClass(user);

        return res.json({
            message: 'user successfully created.',
            user: securedUser,
        });
    }
}
