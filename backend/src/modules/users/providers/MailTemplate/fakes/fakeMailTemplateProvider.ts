import IParseTemplateMailDTO from '../dtos/IParseTemplateTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplate';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IParseTemplateMailDTO): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;
