import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AdvertisementsDto } from './dto/advertisements.dto';
import { IAdvertisement } from './interfaces/iadvertisement';
import { InjectModel } from '@nestjs/sequelize';
import { Advertisement } from './advertisements.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { User } from '../users/users.model';
import { IPaginateDto } from '../common/Ipaginate-params';

@Injectable()
export class AdvertisementsService {
    constructor(
        @InjectModel(Advertisement) private advertisementModel: typeof Advertisement,
        @InjectModel(AdvertisingProvider) private advertisingProviderModel: typeof AdvertisingProvider,
    ) {
    }

    findOne = async (advertisementId: number): Promise<IAdvertisement> => {
        const advertisement: IAdvertisement | null = await this.advertisementModel.findOne({
            where: {
                id: advertisementId,
                isPublished: true,
            },
            include: [
                {
                    model: AdvertisingProvider,
                    include: [{ model: User }],
                },
            ],
        });
        if (!advertisement) {
            throw new HttpException('Not found advertisement', HttpStatus.NOT_FOUND);
        }
        return advertisement;
    };

    findAll = async (paginateDto: IPaginateDto): Promise<IAdvertisement[]> => {
        return this.advertisementModel.findAll({
            where: { isPublished: true },
            include: [
                {
                    model: AdvertisingProvider,
                    include: [{ model: User }],
                },
            ],
            limit: paginateDto.limit,
            offset: paginateDto.offset,
            order: [[paginateDto.orderFieldName, paginateDto.order]]
        });
    };
    getAuthUserAdvertisements = async (UserId: number): Promise<IAdvertisement[]> => {
        const advertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        const AdvertisingProviderId = advertisingProvider.id;
        return this.advertisementModel.findAll({ where: { AdvertisingProviderId } });
    };

    createAdvertisement = async (UserId: number, dto: AdvertisementsDto): Promise<IAdvertisement> => {
        const advertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        const AdvertisingProviderId = advertisingProvider.id;
        return this.advertisementModel.create({ ...dto, AdvertisingProviderId });
    };

    updateAdvertisement = async (advertisementId: number, dto: AdvertisementsDto): Promise<IAdvertisement> => {
        await this.advertisementModel.update(dto, { where: { id: advertisementId } });
        return this.advertisementModel.findByPk(advertisementId);
    };

    publish = async (advertisementId: number): Promise<IAdvertisement> => {
        await this.advertisementModel.update({ isPublished: true }, { where: { id: advertisementId } });
        return this.advertisementModel.findByPk(advertisementId);
    };

    unpublish = async (advertisementId: number): Promise<IAdvertisement> => {
        await this.advertisementModel.update({ isPublished: false }, { where: { id: advertisementId } });
        return this.advertisementModel.findByPk(advertisementId);
    };
    remove = async (advertisementId: number): Promise<void> => {
        await this.advertisementModel.destroy({ where: { id: advertisementId } });
    };

}
