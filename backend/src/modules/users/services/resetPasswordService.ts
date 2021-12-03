import AppError from '@shared/errors/AppError';
import IusersRepositories from '../repositories/IusersRepositories';
import IUserTokenRepository from '../repositories/IUserToken';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IhashProvider from '../providers/hashProvider/models/IhashProvider';

interface IRequest {
    token: string;
    password: string;
    password_confirmation: string;
}

@injectable()
class resetPasswordService {
    constructor(
        @inject('UsersRepository')
        private UsersRepository: IusersRepositories,
        @inject('userTokensRepository')
        private UsersTokenRepository: IUserTokenRepository,
        @inject('hashProvider')
        private hashProvider: IhashProvider,
    ) {}

    public async execute({
        token,
        password,
        password_confirmation,
    }: IRequest): Promise<void> {
        const TokenUser = await this.UsersTokenRepository.findByToken(token);

        const compareDate = new Date(Date.now());

        if (!TokenUser) {
            throw new AppError('this token doesnt exist or expired.');
        }

        if (isAfter(compareDate, TokenUser.createdAt)) {
            throw new AppError('this token doesnt exist or expired.');
        }

        const user = await this.UsersRepository.findById(TokenUser.user_id);

        if (!user) {
            throw new AppError('user doesnt found with this token');
        }

        if (password !== password_confirmation) {
            throw new AppError('password doesnt match');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        user.password = hashedPassword;

        await this.UsersRepository.save(user);

        await this.UsersTokenRepository.deleteToken(token)
    }
}

export default resetPasswordService;
