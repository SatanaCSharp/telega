import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { IAdvertisement } from './interfaces/iadvertisement';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';


@Table
export class Advertisement extends Model<Advertisement> implements IAdvertisement {
    @Column description: string;
    @Column image: string;
    @Column isPublished: boolean;


    @ForeignKey(() => AdvertisingProvider)
    @Column AdvertisingProviderId: number;

    @BelongsTo(() => AdvertisingProvider)
    advertisingProvider: AdvertisingProvider;
}
