import IhashProvider from '../models/IhashProvider';

export default class FakeHashProvider implements IhashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(
        payload: string,
        hashedPassword: string,
    ): Promise<Boolean> {
        return payload === hashedPassword;
    }
}
