interface IMailContact {
    name: string;
    email: string;
}

import IParseTemplateMailDTO from '../../MailTemplate/dtos/IParseTemplateTemplateDTO';

export default interface ISendMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseTemplateMailDTO;
}
