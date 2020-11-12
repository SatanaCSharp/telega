import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IChannelOwner } from './interfaces/ichannel-owner';
import { User } from '../users/users.model';


@Table
export class ChannelOwner extends Model<ChannelOwner> implements IChannelOwner {
    @ForeignKey(() => User)
    @Column UserId: number

    @BelongsTo(() => User)
    user: User;
}
