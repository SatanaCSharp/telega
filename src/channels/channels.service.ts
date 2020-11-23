import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '../common/base.service';
import { ChannelsDto } from './dto/channels.dto';
import { IChannel } from './interfaces/ichannel';
import { InjectModel } from '@nestjs/sequelize';
import { Channel } from './channels.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';
import { User } from '../users/users.model';
import { IPaginateDto } from '../common/Ipaginate-params';

@Injectable()
export class ChannelsService {
    constructor(
        @InjectModel(Channel) private channelModel: typeof Channel,
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
    ) {}

    findAll = async (paginateDto: IPaginateDto): Promise<IChannel[]> => {
        try {
            return this.channelModel.findAll({
                include: [
                    {
                        model: ChannelOwner,
                        include: [{ model: User }],
                    }
                ],
                limit: paginateDto.limit,
                offset: paginateDto.offset,
                order: [[paginateDto.orderFieldName, paginateDto.order]]
            });
        }  catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    };
    getAuthUserChannels = async (UserId: number): Promise<IChannel[]> => {
        try {
            const channelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
            const ChannelOwnerId = channelOwner.id;
            return this.channelModel.findAll({ where: { ChannelOwnerId } });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    createChannels = async (UserId: number, dtos: ChannelsDto[]): Promise<IChannel[]> => {
        try {
            const channelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
            const ChannelOwnerId = channelOwner.id;
            const channelDtos: ChannelsDto[] = dtos.map((channelDto) => ({ ...channelDto, ChannelOwnerId }));
            return this.channelModel.bulkCreate(channelDtos, { returning: true });
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    };
}
