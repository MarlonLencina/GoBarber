import UserToken from '@modules/users/infra/typeorm/entities/userToken-model';

export default interface IUserTokenRepository {
    generate(user_id: string): Promise<UserToken>;
    findByToken(token: string): Promise<UserToken | undefined>;
    deleteToken(token: string): Promise<void>;
}
