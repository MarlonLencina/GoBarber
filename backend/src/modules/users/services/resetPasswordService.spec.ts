import fakeUsersRepository from '../repositories/fakes/fake-usersRepositories';
import AppError from '@shared/errors/AppError';
import sendForgotPasswordEmailService from '@modules/users/services/sendForgotPasswordEmail-service';
import fakeHashProvider from '../providers/hashProvider/fakes/fake-hashProvider';
import createUserService from '@modules/users/services/createUser-service';
import fakeEmailProvider from '@modules/users/providers/mailProvider/fakes/fakeEmailProvider';
import fakeUsersTokenRepository from '@modules/users/repositories/fakes/fake-userTokenRepository';
import resetPasswordService from '@modules/users/services/resetPasswordService';

let FakeUsersRepository: fakeUsersRepository;
let CreateUserService: createUserService;
let FakeEmailProvider: fakeEmailProvider;
let FakeUsersTokenRepository: fakeUsersTokenRepository;
let FakeHashProvider: fakeHashProvider;
let SendForgotPasswordEmailService: sendForgotPasswordEmailService;
let ResetPasswordService: resetPasswordService;

describe('sendForgotPasswordEmail', () => {
    beforeEach(() => {
        FakeEmailProvider = new fakeEmailProvider();
        FakeUsersRepository = new fakeUsersRepository();
        FakeHashProvider = new fakeHashProvider();
        FakeUsersTokenRepository = new fakeUsersTokenRepository();

        CreateUserService = new createUserService(
            FakeUsersRepository,
            FakeHashProvider,
        );

        SendForgotPasswordEmailService = new sendForgotPasswordEmailService(
            FakeUsersRepository,
            FakeEmailProvider,
            FakeUsersTokenRepository,
        );

        ResetPasswordService = new resetPasswordService(
            FakeUsersRepository,
            FakeUsersTokenRepository,
        );
    });

    it('should be able to reset the password', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        const { token } = await FakeUsersTokenRepository.generate(User.id);

        await ResetPasswordService.execute({
            token,
            password: '12345678',
        });

        const updatedUser = await FakeUsersRepository.findById(User.id);

        expect(updatedUser?.password).toBe('12345678');
    });
});
