import IhashProvider from '../models/IhashProvider';
import { hash, compare } from 'bcryptjs';

export default class BcryptHashProvider implements IhashProvider {
    public async generateHash(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    public async compareHash(
        payload: string,
        hashed: string,
    ): Promise<Boolean> {
        return compare(payload, hashed);
    }
}
