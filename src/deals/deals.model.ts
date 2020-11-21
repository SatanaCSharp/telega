import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IDeal } from './interfaces/ideal';
import { ChannelOwner } from '../channel-owners/channel-owners.model';
import { Channel } from '../channels/channels.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { Advertisement } from '../advertisements/advertisements.model';


@Table
export class Deal extends Model<Deal> implements IDeal {
    @Column status: string;

    @ForeignKey(() => Advertisement)
    @Column AdvertisementId: number;

    @BelongsTo(() => Advertisement)
    advertisement: Advertisement;

    @ForeignKey(() => AdvertisingProvider)
    @Column AdvertisingProviderId: number;

    @BelongsTo(() => AdvertisingProvider)
    advertisingProvider: AdvertisingProvider;

    @ForeignKey(() => Channel)
    @Column ChannelId: number;

    @BelongsTo(() => Channel)
    channel: Channel;

    @ForeignKey(() => ChannelOwner)
    @Column ChannelOwnerId: number;

    @BelongsTo(() => ChannelOwner)
    channelOwner: ChannelOwner;

}
