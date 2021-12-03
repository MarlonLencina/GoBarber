import IParseTemplateMailDTO from '../dtos/IParseTemplateTemplateDTO';

export default interface IMailTemplateProvider {
    parse(data: IParseTemplateMailDTO): Promise<string>;
}
