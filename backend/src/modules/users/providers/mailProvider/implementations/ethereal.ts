import IMailProvider from '../models/iEmailProvider';
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '@modules/users/providers/MailTemplate/models/IMailTemplate';
import { inject, injectable } from 'tsyringe';
import HandleBarsFakeMailTemplateProvider from '@modules/users/providers/MailTemplate/implementations//handleBarsMailTemplateProvider';

interface IRequest {
    to: string;
    body: string;
}

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendEmailToUser({
        to,
        from,
        subject,
        templateData,
    }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gorbarber.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject: 'Recuperação de senha',
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;
