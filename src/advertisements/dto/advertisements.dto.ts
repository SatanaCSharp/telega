import { UserDto } from '../../users/dto/user.dto';
import { IAdvertisement } from '../interfaces/iadvertisement';

export class AdvertisementsDto {
    id?: number;
    description: string;
    image: string;
    isPublished: boolean;
    user?: UserDto;
    createdAt?: Date;
    constructor(advertisement: IAdvertisement) {
        this.id = advertisement.id;
        this.description = advertisement.description;
        this.image = advertisement.image;
        this.isPublished = advertisement.isPublished;
        this.createdAt = new Date(advertisement.createdAt);
        if (advertisement.advertisingProvider?.user) {
            this.user = new UserDto(advertisement.advertisingProvider.user);
        }
    }
}
