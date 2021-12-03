import fakeUsersRepository from '../repositories/fakes/fake-usersRepositories';
import AppError from '@shared/errors/AppError';
import sendForgotPasswordEmailService from '@modules/users/services/sendForgotPasswordEmail-service';
import fakeHashProvider from '../providers/hashProvider/fakes/fake-hashProvider';
import createUserService from '@modules/users/services/createUser-service';
import fakeEmailProvider from '@modules/users/providers/mailProvider/fakes/fakeEmailProvider';
import fakeUsersTokenRepository from '@modules/users/repositories/fakes/fake-userTokenRepository';

let FakeUsersRepository: fakeUsersRepository;
let CreateUserService: createUserService;
let FakeEmailProvider: fakeEmailProvider;
let FakeUsersTokenRepository: fakeUsersTokenRepository;
let FakeHashProvider: fakeHashProvider;
let SendForgotPasswordEmailService: sendForgotPasswordEmailService;

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
    });

    it('should be able to recover the password using email', async () => {
        await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        const sendEmail = jest.spyOn(FakeEmailProvider, 'sendEmail');

        await SendForgotPasswordEmailService.execute({
            email: 'marlon@stack.com',
        });

        expect(sendEmail).toHaveBeenCalled();
    });

    it('should not be able to recover an unexisting account', async () => {
        await expect(
            SendForgotPasswordEmailService.execute({
                email: 'marlon@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(FakeUsersTokenRepository, 'generate');
        const sendEmail = jest.spyOn(FakeEmailProvider, 'sendEmail');

        const user = await CreateUserService.execute({
            name: 'Marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        await SendForgotPasswordEmailService.execute({
            email: 'marlon@stack.com',
        });

        await expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
