import authValidationService from '@modules/users/services/authValidation-service';
import AppError from '@shared/errors/AppError';
import UserRepository from '../repositories/fakes/fake-usersRepositories';
import createUserService from '@modules/users/services/createUser-service';
import FakeHashProvider from '@modules/users/providers/hashProvider/fakes/fake-hashProvider';

describe('CreateUser', () => {
    it('Should be able to authenticate', async () => {
        const fakeUsersRepository = new UserRepository();
        const fakehashProvider = new FakeHashProvider();

        const AuthValidate = new authValidationService(
            fakeUsersRepository,
            fakehashProvider,
        );
        const CreateUserService = new createUserService(
            fakeUsersRepository,
            fakehashProvider,
        );

        await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        const user = await AuthValidate.execute({
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(user).toHaveProperty('token');
    });

    it('Should not be able to authenticate with wrong pass', async () => {
        const fakeUsersRepository = new UserRepository();
        const fakehashProvider = new FakeHashProvider();

        const AuthValidate = new authValidationService(
            fakeUsersRepository,
            fakehashProvider,
        );
        const CreateUserService = new createUserService(
            fakeUsersRepository,
            fakehashProvider,
        );

        await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(
            AuthValidate.execute({
                email: 'marlon@stack.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate with wrong mail', async () => {
        const fakeUsersRepository = new UserRepository();
        const fakehashProvider = new FakeHashProvider();

        const AuthValidate = new authValidationService(
            fakeUsersRepository,
            fakehashProvider,
        );
        const CreateUserService = new createUserService(
            fakeUsersRepository,
            fakehashProvider,
        );

        await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(
            AuthValidate.execute({
                email: 'marlon@stack.com.br',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
