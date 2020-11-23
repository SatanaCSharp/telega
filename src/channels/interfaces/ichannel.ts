import { IChannelOwner } from '../../channel-owners/interfaces/ichannel-owner';

export interface IChannel {
    id?: number;
    title: string;
    description: string;
    participantsCount: number;
    date: Date;
    postsCount: number;
    priceRate: number;
    ChannelOwnerId: number;
    channelOwner: IChannelOwner;
}
