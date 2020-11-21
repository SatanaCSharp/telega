import { IChannelOwner } from '../../channel-owners/interfaces/ichannel-owner';
import { IChannel } from '../../channels/interfaces/ichannel';
import { IAdvertisingProvider } from '../../advertising-providers/interfaces/iadvertising-provider';
import { IAdvertisement } from '../../advertisements/interfaces/iadvertisement';

export interface IDeal {
    id?: number;
    status: string;
    createdAt?: Date;
    ChannelId: number;
    ChannelOwnerId: number;
    AdvertisingProviderId: number;
    AdvertisementId: number;

    channel: IChannel;
    channelOwner: IChannelOwner;
    advertisingProvider: IAdvertisingProvider;
    advertisement: IAdvertisement;
}
