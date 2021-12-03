import fakeUsersRepository from '../repositories/fakes/fake-usersRepositories';
import AppError from '@shared/errors/AppError';
import sendForgotPasswordEmailService from '@modules/users/services/sendForgotPasswordEmail-service';
import fakeHashProvider from '../providers/hashProvider/fakes/fake-hashProvider';
import createUserService from '@modules/users/services/createUser-service';
import fakeEmailProvider from '@modules/users/providers/mailProvider/fakes/fakeEmailProvider';
import fakeUsersTokenRepository from '@modules/users/repositories/fakes/fake-userTokenRepository';
import resetPasswordService from '@modules/users/services/resetPasswordService';
import updateProfileService from '@modules/users/services/updateProfileService';

let FakeUsersRepository: fakeUsersRepository;
let CreateUserService: createUserService;
let FakeEmailProvider: fakeEmailProvider;
let FakeUsersTokenRepository: fakeUsersTokenRepository;
let FakeHashProvider: fakeHashProvider;
let SendForgotPasswordEmailService: sendForgotPasswordEmailService;
let ResetPasswordService: resetPasswordService;
let updateProfile: updateProfileService;

describe('updateProfile', () => {
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

        updateProfile = new updateProfileService(
            FakeUsersRepository,
            FakeHashProvider,
        );
    });

    it('should be able to update profile', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: User.id,
            name: 'marlon2',
            email: 'marlon@stack.com2',
        });

        expect(updatedUser.name).toBe('marlon2');
        expect(updatedUser.email).toBe('marlon@stack.com2');
    });

    it('should not be able to change the email, when email is already used', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        let User2 = await CreateUserService.execute({
            name: 'marlon2',
            email: 'marlon2@stack.com2',
            password: '1234562',
        });

        await expect(
            updateProfile.execute({
                user_id: User.id,
                name: 'marlon2',
                email: 'marlon2@stack.com2',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        await updateProfile.execute({
            user_id: User.id,
            name: 'marlon',
            email: 'marlon@stack.com',
            oldPassword: '123456',
            password: '12345678',
        }),
            await expect(User.password).toBe('12345678');
    });

    it('should be able to update the password', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        await updateProfile.execute({
            user_id: User.id,
            name: 'marlon',
            email: 'marlon@stack.com',
            oldPassword: '123456',
            password: '12345678',
        }),
            await expect(User.password).toBe('12345678');
    });

    it('should not be able to update passsword if old password isnt informed', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(
            updateProfile.execute({
                user_id: User.id,
                name: 'marlon',
                email: 'marlon@stack.com',
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update passsword if old password is wrong', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        expect(
            updateProfile.execute({
                user_id: User.id,
                name: 'marlon',
                email: 'marlon@stack.com',
                oldPassword: 'wrongoldpassword',
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update passsword with non existing token', async () => {
        await expect(
            ResetPasswordService.execute({
                token: 'non-existing-token',
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update passsword with non existing user', async () => {
        const { token } = await FakeUsersTokenRepository.generate('token');

        await expect(
            ResetPasswordService.execute({
                token,
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update passsword if passed more than two hours', async () => {
        let User = await CreateUserService.execute({
            name: 'marlon',
            email: 'marlon@stack.com',
            password: '123456',
        });

        const { token } = await FakeUsersTokenRepository.generate(User.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            ResetPasswordService.execute({
                token,
                password: '12345678',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
