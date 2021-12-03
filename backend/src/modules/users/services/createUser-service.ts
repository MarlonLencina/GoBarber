import User from '@modules/users/infra/typeorm/entities/user-model';
import { getRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import IusersRepositories from './../repositories/IusersRepositories';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';

import IhashProvider from '../providers/hashProvider/models/IhashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class createUserService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IusersRepositories,
        @inject('hashProvider')
        private HashProvider: IhashProvider,
        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExists = await this.userRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError(
                'Already exists some user with this email.',
                401,
            );
        }

        const hashedPassword = await this.HashProvider.generateHash(password);

        const userCreated = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await this.CacheProvider.invalidatePrefix('list-provider');

        return userCreated;
    }
}

export default createUserService;
