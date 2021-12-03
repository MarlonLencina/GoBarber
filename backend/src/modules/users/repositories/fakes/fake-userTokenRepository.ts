import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/userToken-model';

import IUserTokenRepository from './../IUserToken';

class fakeUsersTokenRepository implements IUserTokenRepository {
    private usersTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            token: uuid(),
            user_id,
            createdAt: new Date(),
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const user = this.usersTokens.find(
            (userToken) => userToken.token == token,
        );

        return user;
    }
}

export default fakeUsersTokenRepository;
