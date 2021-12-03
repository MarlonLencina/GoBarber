import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import notification from '../../notifications/infra/typeorm/schemas/notification';
import { ObjectId } from 'mongodb';

class NotificationsRepository implements INotificationsRepository {
    private notifications: notification[] = [];

    public async create({
        content,
        recipient_id,
    }: ICreateNotificationDTO): Promise<notification> {
        const Notification = new notification();

        Object.assign(notification, {
            id: new ObjectId(),
            content,
            recipient_id,
        });

        this.notifications.push(Notification);
        return Notification;
    }
}

export default NotificationsRepository;
