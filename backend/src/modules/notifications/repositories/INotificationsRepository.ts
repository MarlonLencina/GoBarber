import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import notification from '../infra/typeorm/schemas/notification';
export default interface INotificationsRepository {
    create(data: ICreateNotificationDTO): Promise<notification>;
}
