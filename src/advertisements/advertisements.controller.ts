import { Body, Controller, Get, Inject, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsDto } from './dto/advertisements.dto';
import { IAdvertisement } from './interfaces/iadvertisement';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { CreateAdvertisementsDto } from './dto/create-advertisements.dto';

@Controller('advertisements')
export class AdvertisementsController {
    constructor(@Inject(AdvertisementsService) private advertisementsService: AdvertisementsService) {
    }

    @Get('/')
    public async getAll(): Promise<AdvertisementsDto[]> {
        const advertisements: IAdvertisement[] = await this.advertisementsService.findAll();
        return advertisements.map((advertisement: IAdvertisement) => new AdvertisementsDto(advertisement));
    }
    @Get('/:id')
    public async getOne(@Param() id: number): Promise<AdvertisementsDto> {
        const advertisement: IAdvertisement = await this.advertisementsService.findOne(id);
        return new AdvertisementsDto(advertisement);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/my')
    public async getAuthUserChannels(@User() { userId }: { userId: number }): Promise<AdvertisementsDto[]> {
        const advertisements: IAdvertisement[] = await this.advertisementsService.getAuthUserAdvertisements(userId);
        return advertisements.map((advertisement: IAdvertisement) => new AdvertisementsDto(advertisement));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    public async createAdvertisement(
        @User() { userId }: { userId: number },
        @Body(ValidationPipe) advertisementDto: CreateAdvertisementsDto,
    ): Promise<AdvertisementsDto> {
        const advertisement: IAdvertisement = await this.advertisementsService.createAdvertisement(userId, advertisementDto);
        return new AdvertisementsDto(advertisement);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/:id')
    public async updateAdvertisement(
        @Param() id: number,
        @Body(ValidationPipe) advertisementDto: CreateAdvertisementsDto,
    ): Promise<AdvertisementsDto> {
        const advertisement: IAdvertisement = await this.advertisementsService.createAdvertisement(id, advertisementDto);
        return new AdvertisementsDto(advertisement);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/publish')
    public async publish(@Param() id: number) {
        const advertisement: IAdvertisement = await this.advertisementsService.publish(id);
        return new AdvertisementsDto(advertisement);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/unpublish')
    public async unpublish(@Param() id: number) {
        const advertisement: IAdvertisement = await this.advertisementsService.unpublish(id);
        return new AdvertisementsDto(advertisement);
    }
}
