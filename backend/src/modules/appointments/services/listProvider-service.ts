import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IusersRepositories from '@modules/users/repositories/IusersRepositories';
import User from '@modules/users/infra/typeorm/entities/user-model';
import IFindAllProviderDTO from '../dtos/IFindAllProvidersDTO';
import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
}

@injectable()
class listProviderService {
    constructor(
        @inject('UsersRepository')
        private UsersRepository: IusersRepositories,
        @inject('CacheProvider')
        private CacheProvider: ICacheProvider,
    ) {}

    public async execute(data: IFindAllProviderDTO): Promise<User[]> {
        let users = await this.CacheProvider.recover<User[]>(
            `list-provider:${data.except_UserID}`,
        );

        if (!users) {
            users = await this.UsersRepository.findAllProviders({
                except_UserID: data.except_UserID,
            });

            await this.CacheProvider.save(
                `list-provider:${data.except_UserID}`,
                classToClass(users),
            );
        }

        return users;
    }
}

export default listProviderService;
