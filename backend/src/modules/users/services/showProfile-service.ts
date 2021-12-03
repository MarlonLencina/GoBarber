import AppError from '@shared/errors/AppError';
import IhashProvider from '../providers/hashProvider/models/IhashProvider';
import IusersRepositories from '../repositories/IusersRepositories';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/user-model';
import userRepository from '../infra/typeorm/repository/userRepositories';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    oldPassword?: string;
    password?: string;
}

@injectable()
class showProfileService {
    constructor(
        @inject('UsersRepository')
        private UsersRepository: IusersRepositories,
    ) {}

    public async execute(user_id: string): Promise<User> {
        const user = await this.UsersRepository.findById(user_id);

        if (!user) throw new AppError('user not found');

        return user;
    }
}

export default showProfileService;
