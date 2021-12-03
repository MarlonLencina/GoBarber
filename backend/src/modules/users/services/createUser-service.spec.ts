import createUserService from '@modules/users/services/createUser-service';
import AppError from '@shared/errors/AppError';
import UserRepository from '../repositories/fakes/fake-usersRepositories';
import fakehashProvider from '@modules/users/providers/hashProvider/fakes/fake-hashProvider';

describe('CreateUser', () => {
    it('Should be able to create a new user', async () => {
        const fakeUsersRepository = new UserRepository();
        const FakeHashProvider = new fakehashProvider();

        const CreateUserService = new createUserService(
            fakeUsersRepository,
            FakeHashProvider,
        );

        const user = await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create a new user with the same email', async () => {
        const fakeUsersRepository = new UserRepository();
        const FakeHashProvider = new fakehashProvider();

        const CreateUserService = new createUserService(
            fakeUsersRepository,
            FakeHashProvider,
        );

        await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(
            CreateUserService.execute({
                name: 'Marlon',
                email: 'marlon@stack.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
