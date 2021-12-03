import IParseTemplateMailDTO from '../dtos/IParseTemplateTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplate';
import Handlebars from 'handlebars';
import fs from 'fs';

class HandleBarsTemplateMailProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseTemplateMailDTO): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parsedTemplate = Handlebars.compile(templateFileContent);
        return parsedTemplate(variables);
    }
}

export default HandleBarsTemplateMailProvider;


