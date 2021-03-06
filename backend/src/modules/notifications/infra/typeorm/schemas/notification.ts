import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectID,
    ObjectIdColumn,
} from 'typeorm';

@Entity('notifications')
class notification {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    content: string;

    @Column('uuid')
    recipient_id: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default notification;
