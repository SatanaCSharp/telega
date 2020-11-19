import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deal } from './deals.model';
import { IDeal } from './interfaces/ideal';
import { Channel } from '../channels/channels.model';
import { User } from '../users/users.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';
import { Advertisement } from '../advertisements/advertisements.model';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { IAdvertisingProvider } from '../advertising-providers/interfaces/iadvertising-provider';
import { IChannelOwner } from '../channel-owners/interfaces/ichannel-owner';
import { EStatuses } from './enums/statuses.enum';
import { CreateDealsDto } from './dto/create-deals.dto';

@Injectable()
export class DealsService {
    constructor(
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
        @InjectModel(AdvertisingProvider) private advertisingProviderModel: typeof AdvertisingProvider,
        @InjectModel(Deal) private dealsModel: typeof Deal,
    ) {}

    create = async (UserId: number, dto: CreateDealsDto): Promise<IDeal> => {
        const advertisingProvider: IAdvertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        const deal: IDeal = await this.dealsModel.create({ ...dto, AdvertisingProviderId: advertisingProvider.id });
        return this.dealsModel.findOne({
            where: { id: deal.id },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };

    getAdvertisingProviderPendingDeals = async (UserId: number): Promise<IDeal[]> => {
        const advertisingProvider: IAdvertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        return this.dealsModel.findAll({
            where: { AdvertisingProvideId: advertisingProvider.id, status: EStatuses.pending },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };

    getAdvertisingProviderConfirmedDeals = async (UserId: number): Promise<IDeal[]> => {
        const advertisingProvider: IAdvertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        return this.dealsModel.findAll({
            where: { AdvertisingProvideId: advertisingProvider.id, status: EStatuses.confirmed },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };

    getAdvertisingProviderRejectedDeals = async (UserId: number): Promise<IDeal[]> => {
        const advertisingProvider: IAdvertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        return this.dealsModel.findAll({
            where: { AdvertisingProvideId: advertisingProvider.id, status: EStatuses.rejected },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };


    getChannelOwnerPendingDeals = async (UserId): Promise<IDeal[]> => {
        const channelOwner: IChannelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
        return this.dealsModel.findAll({
            where: { ChannelOwnerId: channelOwner.id, status: EStatuses.pending },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };

    getChannelOwnerConfirmedDeals = async (UserId): Promise<IDeal[]> => {
        const channelOwner: IChannelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
        return this.dealsModel.findAll({
            where: { ChannelOwnerId: channelOwner.id, status: EStatuses.confirmed },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };
    getChannelOwnerRejectedDeals = async (UserId): Promise<IDeal[]> => {
        const channelOwner: IChannelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
        return this.dealsModel.findAll({
            where: { ChannelOwnerId: channelOwner.id, status: EStatuses.rejected },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };

    confirmDeal = async (dealId: number): Promise<IDeal> => {
        await this.dealsModel.update({ status: EStatuses.confirmed }, { where: { id: dealId } });
        return this.dealsModel.findOne({
            where: { id: dealId },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };

    rejectDeal = async (dealId: number): Promise<IDeal> => {
        await this.dealsModel.update({ status: EStatuses.rejected }, { where: { id: dealId } });
        return this.dealsModel.findOne({
            where: { id: dealId },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };
    remove = async (dealId: number): Promise<void> => {
        await this.dealsModel.destroy({ where: { id: dealId } });
    };
}
