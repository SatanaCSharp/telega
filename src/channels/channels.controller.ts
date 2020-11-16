import { Body, Controller, Get, Inject, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { CreateChannelsDto } from './dto/create-channels.dto';
import { IChannel } from './interfaces/ichannel';
import { ChannelsDto } from './dto/channels.dto';

@Controller('channels')
export class ChannelsController {
    constructor(@Inject(ChannelsService) private channelService: ChannelsService) {
    }

    @Get('/')
    public async getAll(): Promise<ChannelsDto[]> {
        const channels: IChannel[] = await this.channelService.findAll();
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
