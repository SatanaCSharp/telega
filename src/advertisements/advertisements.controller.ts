import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsDto } from './dto/advertisements.dto';
import { IAdvertisement } from './interfaces/iadvertisement';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { CreateAdvertisementsDto } from './dto/create-advertisements.dto';
import { IPaginateDto, IPaginateParams } from '../common/Ipaginate-params';

@Controller('advertisements')
export class AdvertisementsController {
    constructor(@Inject(AdvertisementsService) private advertisementsService: AdvertisementsService) {
    }

    @Get('/')
    public async getAll(@Query() query: IPaginateParams): Promise<AdvertisementsDto[]> {
        const DEFAULT_QUANTITY_PER_PAGE = 10;
        const paginateDto: IPaginateDto = {
            limit: Number(query.quantityPerPage) || DEFAULT_QUANTITY_PER_PAGE,
            offset: query.page ? Number(query.page) * Number(query.quantityPerPage) : 0 ,
            order: query.order || 'DESC',
            orderFieldName: query.orderFieldName || 'createdAt',
        };
        const advertisements: IAdvertisement[] = await this.advertisementsService.findAll(paginateDto);
        return advertisements.map((advertisement: IAdvertisement) => new AdvertisementsDto(advertisement));
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/my')
    public async getAuthUserChannels(@User() { userId }: { userId: number }): Promise<AdvertisementsDto[]> {
        const advertisements: IAdvertisement[] = await this.advertisementsService.getAuthUserAdvertisements(userId);
        return advertisements.map((advertisement: IAdvertisement) => new AdvertisementsDto(advertisement));
    }
    @Get('/:id')
    public async getOne(@Param() params): Promise<AdvertisementsDto> {
        const advertisement: IAdvertisement = await this.advertisementsService.findOne(params.id);
        return new AdvertisementsDto(advertisement);
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
        @Param() params,
        @Body(ValidationPipe) advertisementDto: CreateAdvertisementsDto,
    ): Promise<AdvertisementsDto> {
        const advertisement: IAdvertisement = await this.advertisementsService.updateAdvertisement(params.id, advertisementDto);
        return new AdvertisementsDto(advertisement);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/publish')
    public async publish(@Param() params) {
        const advertisement: IAdvertisement = await this.advertisementsService.publish(params.id);
        return new AdvertisementsDto(advertisement);
    }
    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/unpublish')
    public async unpublish(@Param() params) {
        const advertisement: IAdvertisement = await this.advertisementsService.unpublish(params.id);
        return new AdvertisementsDto(advertisement);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    public async remove(@Param() params) {
        await this.advertisementsService.remove(params.id);
    }
}
