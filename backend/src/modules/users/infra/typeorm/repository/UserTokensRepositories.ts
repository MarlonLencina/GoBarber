import { EntityRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserToken';
import { getRepository } from 'typeorm';
import UsersToken from '../entities/userToken-model';
import AppError from '@shared/errors/AppError';
// liskov substitution principle

class userTokensRepository implements IUserTokenRepository {
    private ormRepository: Repository<UsersToken>;

    constructor() {
        this.ormRepository = getRepository(UsersToken);
    }

    public async generate(user_id: string): Promise<UsersToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);
        return userToken;
    }

    public async findByToken(token: string): Promise<UsersToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token },
        });

        return userToken;
    }

    public async deleteToken(token: string): Promise<void> {
        const tokenFound = await this.ormRepository.findOne({
            where: { token },
        });

        if (!tokenFound) {
            throw new AppError('this token doesnt exist');
        }

        await this.ormRepository.remove(tokenFound);
    }
}

export default userTokensRepository;
