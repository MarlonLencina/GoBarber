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
class updateProfileService {
    constructor(
        @inject('UsersRepository')
        private UsersRepository: IusersRepositories,
        @inject('hashProvider')
        private HashProvider: IhashProvider,
    ) {}

    public async execute(data: IRequest): Promise<User> {
        const user = await this.UsersRepository.findById(data.user_id);

        if (!user) throw new AppError('user not found');

        const userWithUpdateEmail = await this.UsersRepository.findByEmail(
            data.email,
        );

        if (userWithUpdateEmail && userWithUpdateEmail.id !== data.user_id)
            throw new AppError('email already used');

        user.email = data.email;
        user.name = data.name;

        if (data.password && data.oldPassword) {
            const checkOldPassword = await this.HashProvider.compareHash(
                data.oldPassword,
                user.password,
            );

            if (!checkOldPassword)
                throw new AppError('old password doesnt match');

            const hashedPassword = await this.HashProvider.generateHash(data.password)
            user.password = hashedPassword;
        }

        return this.UsersRepository.save(user);
    }

}

export default updateProfileService;
