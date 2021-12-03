import { container } from 'tsyringe';

import IStorageProvider from '@modules/users/providers/storageProvider/models/IStorageProvider';
import Amazons3Provider from '@modules/users/providers/storageProvider/implementations/amazons3';

import ICacheProvider from '@shared/providers/cacheProvider/models/ICacheProvider';
import RedisCacheProvider from '@shared/providers/cacheProvider/implementations/RedisCacheProvider';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/notitificationsRepository';

import IappointmentsRepository from '@modules/appointments/repositories/Iappointment-repository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments-repository';

import IusersRepositories from '@modules/users/repositories/IusersRepositories';
import userRepository from '@modules/users/infra/typeorm/repository/userRepositories';

import IUserTokenRepository from '@modules/users/repositories/IUserToken';
import userTokensRepository from '@modules/users/infra/typeorm/repository/UserTokensRepositories';

import IhashProvider from '@modules/users/providers/hashProvider/models/IhashProvider';
import BcryptHashProvider from '@modules/users/providers/hashProvider/implementations/BCryptHashProvider';

import IMailProvider from '@modules/users/providers/mailProvider/models/iEmailProvider';
import EtherealMailProvider from '@modules/users/providers/mailProvider/implementations/ethereal';

import IMailTemplateProvider from '@modules/users/providers/MailTemplate/models/IMailTemplate';
import HandleBarsTemplateMailProvider from '@modules/users/providers/MailTemplate/implementations/handleBarsMailTemplateProvider';

container.registerSingleton<Amazons3Provider>(
    'Amazons3StorageProvider',
    Amazons3Provider,
);

container.registerInstance<ICacheProvider>(
    'CacheProvider',
    container.resolve(RedisCacheProvider),
);

container.registerSingleton<INotificationsRepository>(
    'NotificationsRepository',
    NotificationsRepository,
);

container.registerSingleton<IhashProvider>('hashProvider', BcryptHashProvider);

container.registerSingleton<IappointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository,
);

container.registerSingleton<IusersRepositories>(
    'UsersRepository',
    userRepository,
);

container.registerSingleton<IUserTokenRepository>(
    'userTokensRepository',
    userTokensRepository,
);

container.registerSingleton<IMailTemplateProvider>(
    'MailTemplateProvider',
    HandleBarsTemplateMailProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
