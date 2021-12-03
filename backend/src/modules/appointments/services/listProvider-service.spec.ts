import fakeUsersRepository from '@modules/users/repositories/fakes/fake-usersRepositories';
import AppError from '@shared/errors/AppError';
import sendForgotPasswordEmailService from '@modules/users/services/sendForgotPasswordEmail-service';
import createUserService from '@modules/users/services/createUser-service';
import fakeEmailProvider from '@modules/users/providers/mailProvider/fakes/fakeEmailProvider';
import fakeUsersTokenRepository from '@modules/users/repositories/fakes/fake-userTokenRepository';
import fakeHashProvider from '@modules/users/providers/hashProvider/fakes/fake-hashProvider';
import listProviderService from './listProvider-service';

let FakeUsersRepository: fakeUsersRepository;
let CreateUserService: createUserService;
let FakeEmailProvider: fakeEmailProvider;
let FakeUsersTokenRepository: fakeUsersTokenRepository;
let FakeHashProvider: fakeHashProvider;

describe('sendForgotPasswordEmail', () => {
    beforeEach(() => {
        FakeEmailProvider = new fakeEmailProvider();
        FakeUsersRepository = new fakeUsersRepository();
        FakeUsersTokenRepository = new fakeUsersTokenRepository();

        CreateUserService = new createUserService(
            FakeUsersRepository,
            FakeHashProvider,
        );
    });

    it('should be able to find all provider expect the userID passed down ', async () => {
        const user_one = await CreateUserService.execute({
            name: 'marlonOne',
            email: 'marlonTwo@test.com',
            password: 'marlonone',
        });

        const user_two = await CreateUserService.execute({
            name: 'marlonTwo',
            email: 'marlonTwo@test.com',
            password: 'marlonTwo',
        });

        const loggedUser = await CreateUserService.execute({
            name: 'marlonThree',
            email: 'marlonThree@test.com',
            password: 'marlonthree',
        });

        const providers = FakeUsersRepository.findAllProviders({
            except_UserID: loggedUser.id,
        });

        expect(providers).toBe([user_one, user_two]);
    });
});
