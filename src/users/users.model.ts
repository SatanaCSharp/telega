import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import { IUser } from './interfaces/iuser';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';

@Table
export class User extends Model<User> implements IUser {
    @Column firstName: string;
    @Column lastName: string;
    @Column email: string;
    @Column password: string;
    @Column phone: string;
    @Column telegramId: number;
    @Column telegramUserName: string;

    @HasOne(() => AdvertisingProvider)
    advertisingProvider: AdvertisingProvider

    @HasOne(() => ChannelOwner)
    channelOwner: ChannelOwner
}
