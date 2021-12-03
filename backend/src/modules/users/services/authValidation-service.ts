import User from '@modules/users/infra/typeorm/entities/user-model';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import config from '@config/configAuth';
import AppError from '@shared/errors/AppError';
import IusersRepositories from './../repositories/IusersRepositories';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IhashProvider from '../providers/hashProvider/models/IhashProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class authValidation {
    constructor(
        @inject('UsersRepository')
        private userRepository: IusersRepositories,
        @inject('hashProvider')
        private HashProvider: IhashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        console.log('testando2');

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect Email/password Combination', 401);
        }

        const passwordMatched = await this.HashProvider.compareHash(
            password,
            user.password,
        );

        if (!passwordMatched) {
            throw new AppError('Incorrect Email/password Combination', 401);
        }

        const token = sign({}, config.jwt.secret, {
            subject: user.id,
            expiresIn: config.jwt.expiresIn,
        });

        return { user, token };
    }
}

export default authValidation;
