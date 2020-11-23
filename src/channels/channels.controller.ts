import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { CreateChannelsDto } from './dto/create-channels.dto';
import { IChannel } from './interfaces/ichannel';
import { ChannelsDto } from './dto/channels.dto';
import { IPaginateDto, IPaginateParams } from '../common/Ipaginate-params';

@Controller('channels')
export class ChannelsController {
    constructor(@Inject(ChannelsService) private channelService: ChannelsService) {
    }

    @Get('/')
    public async getAll(@Query() query: IPaginateParams): Promise<ChannelsDto[]> {
        const DEFAULT_QUANTITY_PER_PAGE = 10;
        const paginateDto: IPaginateDto = {
            limit: Number(query.quantityPerPage) || DEFAULT_QUANTITY_PER_PAGE,
            offset: query.page ? Number(query.page) * Number(query.quantityPerPage) : 0 ,
            order: query.order || 'DESC',
            orderFieldName: query.orderFieldName || 'createdAt',
        };
        const channels: IChannel[] = await this.channelService.findAll(paginateDto);
        return channels.map((channel: IChannel) => new ChannelsDto(channel));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/my')
    public async getAuthUserChannels(@User() { userId }: { userId: number }): Promise<ChannelsDto[]> {
        const channels: IChannel[] = await this.channelService.getAuthUserChannels(userId);
        return channels.map((channel: IChannel) => new ChannelsDto(channel));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    public async createChannels(
        @User() { userId }: { userId: number },
        @Body(ValidationPipe) channelDtos: CreateChannelsDto[],
    ): Promise<ChannelsDto[]> {
        const channels: IChannel[] = await this.channelService.createChannels(userId, channelDtos);
        return channels.map((channel: IChannel) => new ChannelsDto(channel));
    }

}
