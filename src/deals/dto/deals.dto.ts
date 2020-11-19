import { ChannelsDto } from '../../channels/dto/channels.dto';
import { AdvertisementsDto } from '../../advertisements/dto/advertisements.dto';
import { IDeal } from '../interfaces/ideal';
import { UserDto } from '../../users/dto/user.dto';


export class DealsDto {
    id?: number;
    status: string;
    channel: ChannelsDto;
    channelOwner: UserDto;
    advertisingProvider: UserDto;
    advertisement: AdvertisementsDto;
    createdAt: Date;

    constructor(deal: IDeal) {
        this.id = deal.id;
        this.status = deal.status;
        this.createdAt = deal.createdAt;
        if (deal.channel) {
            this.channel = new ChannelsDto(deal.channel);
        }
        if (deal.channelOwner) {
            this.channelOwner = new UserDto(deal.channelOwner.user);
        }
        if (deal.advertisingProvider) {
            this.advertisingProvider = new UserDto(deal.advertisingProvider.user);
        }
        if (deal.advertisement) {
            this.advertisement = new AdvertisementsDto(deal.advertisement);
        }
    }
}

