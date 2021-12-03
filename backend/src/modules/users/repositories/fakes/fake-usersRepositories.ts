import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/user-model';
import IusersRepositories from '../IusersRepositories';
import ICreateUserDTO from '@modules/users/dtos/dtos';
import IFindAllProviderDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

class fakeUsersRepository implements IusersRepositories {
    private Users: User[] = [];

    public async findAllProviders(data: IFindAllProviderDTO): Promise<User[]> {
        let users = this.Users;
        users = users.filter((user) => user.id !== data.except_UserID);
        return users;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.Users.find((findUser) => findUser.email === email);

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const UserFound = this.Users.find((user) => user.id === id);

        return UserFound;
    }

    public async create({
        name,
        email,
        password,
    }: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid(), name, email, password });

        this.Users.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.Users.findIndex(
            (findUser) => findUser.id === user.id,
        );

        this.Users[findIndex] = user;
        return user;
    }
}

export default fakeUsersRepository;
