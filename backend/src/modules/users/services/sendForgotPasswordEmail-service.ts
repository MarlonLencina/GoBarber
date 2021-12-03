import IusersRepositories from './../repositories/IusersRepositories';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../providers/mailProvider/models/iEmailProvider';
import AppError from '@shared/errors/AppError';
import IUserTokenRepository from '../repositories/IUserToken';
import EtherealMailProvider from '../providers/mailProvider/implementations/ethereal';
import path from 'path';

interface IRequest {
    email: string;
}

@injectable()
class sendForgotPasswordEmail {
    constructor(
        @inject('UsersRepository')
        private userRepository: IusersRepositories,
        @inject('MailProvider')
        private MailProvider: IMailProvider,
        @inject('userTokensRepository')
        private userTokensRepository: IUserTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError(
                'Cant send this email, because this user does not exist',
            );
        }

        console.log(user);
        const { token } = await this.userTokensRepository.generate(user.id);

        const forgetPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'templateForgotPassword.hbs',
        );

        await this.MailProvider.sendEmailToUser({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '(GoBarber) recuperação de senha',
            templateData: {
                file: forgetPasswordTemplate,
                variables: {
                    name: user.name,
                    url: `${process.env.WEB_APP_URL}/reset-password?token=${token}`,
                },
            },
        });
    }
}


export default sendForgotPasswordEmail;
