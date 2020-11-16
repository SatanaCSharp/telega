import { IAdvertisingProvider } from '../../advertising-providers/interfaces/iadvertising-provider';

export interface IAdvertisement {
    id?: number;
    description: string;
    image: string;
    isPublished: boolean;
    createdAt?: Date;
    AdvertisingProviderId: number;
    advertisingProvider: IAdvertisingProvider
}
