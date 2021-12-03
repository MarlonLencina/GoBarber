import IEmailProvider from '../models/iEmailProvider';
import ISendMailDTO from '@modules/users/providers/mailProvider/dtos/ISendMailDTO';

class fakeEmailProvider implements IEmailProvider {
    private message: ISendMailDTO[] = [];

    public async sendEmailToUser(data: ISendMailDTO): Promise<void> {
        this.message.push(data);
    }
}

export default fakeEmailProvider;
