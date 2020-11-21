import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { Status } from './enums/statuses.enum';
import { CreateDealsDto } from './dto/create-deals.dto';
import { IChannel } from '../channels/interfaces/ichannel';
import { EUser } from '../users/enums/user.enum';

@Injectable()
export class DealsService {
    constructor(
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
        @InjectModel(Channel) private channelModel: typeof Channel,
        @InjectModel(AdvertisingProvider) private advertisingProviderModel: typeof AdvertisingProvider,
        @InjectModel(Deal) private dealsModel: typeof Deal,
    ) {
    }
    private static isTargetUserTypeExists<TargetUser>(user: TargetUser, userType: EUser) {
        if (!user) {
            throw new HttpException(`${userType} is not found.`, HttpStatus.NOT_FOUND);
        }
    }

    private getChannelOwnerByUserId = async (UserId: number): Promise<IChannelOwner> => {
        const channelOwner: IChannelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
        DealsService.isTargetUserTypeExists<IChannelOwner>(channelOwner, EUser.channelOwner);
        return channelOwner;
    }

    private getAdvertisingProviderByUserId = async (UserId: number): Promise<IChannelOwner> => {
        const advertisingProvider: IAdvertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        DealsService.isTargetUserTypeExists<IAdvertisingProvider>(advertisingProvider, EUser.advertisingProvider);
        return advertisingProvider;
    }

    create = async (UserId: number, dto: CreateDealsDto): Promise<IDeal> => {
        const advertisingProvider: IAdvertisingProvider = await this.getAdvertisingProviderByUserId(UserId);
        const channel: IChannel = await this.channelModel.findOne({ where: { id: dto.ChannelId } });
        const deal: IDeal = await this.dealsModel.create({
            ...dto,
            AdvertisingProviderId: advertisingProvider.id,
            ChannelOwnerId: channel.ChannelOwnerId
        });
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
        const advertisingProvider: IAdvertisingProvider = await this.getAdvertisingProviderByUserId(UserId);
        return this.dealsModel.findAll({
            where: { AdvertisingProviderId: advertisingProvider.id, status: Status.pending },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };

    getAdvertisingProviderConfirmedDeals = async (UserId: number): Promise<IDeal[]> => {
        const advertisingProvider: IAdvertisingProvider = await this.getAdvertisingProviderByUserId(UserId);
        return this.dealsModel.findAll({
            where: { AdvertisingProviderId: advertisingProvider.id, status: Status.confirmed },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };

    getAdvertisingProviderRejectedDeals = async (UserId: number): Promise<IDeal[]> => {
        const advertisingProvider: IAdvertisingProvider = await this.getAdvertisingProviderByUserId(UserId);
        return this.dealsModel.findAll({
            where: { AdvertisingProviderId: advertisingProvider.id, status: Status.rejected },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: ChannelOwner, include: [{ model: User }] },
            ],
        });
    };


    getChannelOwnerPendingDeals = async (UserId): Promise<IDeal[]> => {
        const channelOwner: IChannelOwner = await this.getChannelOwnerByUserId(UserId);
        return this.dealsModel.findAll({
            where: { ChannelOwnerId: channelOwner.id, status: Status.pending },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };

    getChannelOwnerConfirmedDeals = async (UserId): Promise<IDeal[]> => {
        const channelOwner: IChannelOwner = await this.getChannelOwnerByUserId(UserId);
        return this.dealsModel.findAll({
            where: { ChannelOwnerId: channelOwner.id, status: Status.confirmed },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };
    getChannelOwnerRejectedDeals = async (UserId): Promise<IDeal[]> => {
        const channelOwner: IChannelOwner = await this.getChannelOwnerByUserId(UserId);
        return this.dealsModel.findAll({
            where: { ChannelOwnerId: channelOwner.id, status: Status.rejected },
            include: [
                { model: Advertisement },
                { model: Channel },
                { model: AdvertisingProvider, include: [{ model: User }] },
            ],
        });
    };

    confirmDeal = async (dealId: number): Promise<IDeal> => {
        await this.dealsModel.update({ status: Status.confirmed }, { where: { id: dealId } });
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
        await this.dealsModel.update({ status: Status.rejected }, { where: { id: dealId } });
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
