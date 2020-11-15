import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IChannel } from './interfaces/ichannel';
import { ChannelOwner } from '../channel-owners/channel-owners.model';


@Table
export class Channel extends Model<Channel> implements IChannel {
    @Column title: string;
    @Column description: string;
    @Column participantsCount: number;
    @Column date: Date;
    @Column postsCount: number;
    @Column priceRate: number;

    @ForeignKey(() => ChannelOwner)
    @Column ChannelOwnerId: number;

    @BelongsTo(() => ChannelOwner)
    channelOwner: ChannelOwner;
}
