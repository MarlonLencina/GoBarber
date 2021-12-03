import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import notification from '../schemas/notification';
import { getMongoRepository, MongoRepository } from 'typeorm';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<notification>;

    constructor() {
        this.ormRepository = getMongoRepository(notification, 'mongo');
    }

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<notification> {
        const notification = await this.ormRepository.create({
            content,
            recipient_id,
        });

        await this.ormRepository.save(notification);
        return notification;
    }
}

export default NotificationsRepository;
