import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvider {
    sendEmailToUser(data: ISendMailDTO): Promise<void>;
}
