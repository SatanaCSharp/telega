import { IChannel } from '../interfaces/ichannel';

export class ChannelsDto {
    id?: number;
    title: string;
    description: string;
    participantsCount: number;
    date: Date;
    postsCount: number;
    priceRate: number;
    constructor(channel: IChannel) {
        this.id = channel.id;
        this.title = channel.title;
        this.description = channel.description;
        this.participantsCount = channel.participantsCount;
        this.date = channel.date;
        this.postsCount = channel.postsCount;
        this.priceRate = channel.priceRate;
    }
}
