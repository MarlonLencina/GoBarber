import { isEqual } from 'date-fns';
import User from '../entities/user-model';
import { EntityRepository, Not, Repository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/dtos';

import IusersRepositories from '@modules/users/repositories/IusersRepositories';
import { getRepository } from 'typeorm';
import IFindAllProviderDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';
// liskov substitution principle

class userRepository implements IusersRepositories {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findAllProviders({
        except_UserID,
    }: IFindAllProviderDTO): Promise<User[]> {
        let users: User[];

        if (except_UserID) {
            users = await this.ormRepository.find({
                where: { id: Not(except_UserID) },
            });
        } else {
            users = await this.ormRepository.find({});
        }

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({ where: { email } });
        return user;
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);

        await this.ormRepository.save(user);

        return user;
    }
}

export default userRepository;
