import { IsInt } from 'class-validator';

export class CreateDealsDto {
    @IsInt() ChannelId: number;
    @IsInt() AdvertisementId: number;
}
