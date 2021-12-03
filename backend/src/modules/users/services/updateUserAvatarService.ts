import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IusersRepositories from './../repositories/IusersRepositories';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IhashProvider from '../providers/hashProvider/models/IhashProvider';
import IStorageProvider from '../providers/storageProvider/models/IStorageProvider';
import path from 'path';
import upload from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/user-model';
import uploadConfig from '@config/upload';

interface IRequestUpload {
    user_id: string;
    avatarFileName: string | undefined;
}

@injectable()
class updateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private userRepository: IusersRepositories,
        @inject('Amazons3StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}

    public async execute({
        user_id,
        avatarFileName = '',
    }: IRequestUpload): Promise<User> {
        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError('only authenticated users can update avatar');
        }

        if (user.avatar) {
            await this.storageProvider.deleteFile(avatarFileName);
        }

        user.avatar = avatarFileName;

        await this.storageProvider.saveFile(avatarFileName);

        await this.userRepository.save(user);

        const pathFile = path.resolve(uploadConfig.tmpFolder, avatarFileName);
        await fs.promises.unlink(pathFile);

        return user;
    }
}

export default updateUserAvatarService;
