import User from '../infra/typeorm/entities/user-model';
import ICreateUserDTO from '../dtos/dtos';
import IFindAllProviderDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

export default interface IusersRepositories {
    findAllProviders(data: IFindAllProviderDTO): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    create(userData: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}

// - findbyemail
// - create
// - findbyid
// - save
