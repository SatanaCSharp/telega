import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { DealsService } from './deals.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { IDeal } from './interfaces/ideal';
import { DealsDto } from './dto/deals.dto';
import { CreateDealsDto } from './dto/create-deals.dto';

@Controller('deals')
export class DealsController {
    constructor(private dealsService: DealsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('advertising-provider/pending')
    public async getAdvertisingProviderPendingDeals(@User() { userId }: { userId: number }): Promise<DealsDto[]> {
        const deals: IDeal[] = await this.dealsService.getAdvertisingProviderPendingDeals(userId);
        return deals.map((deal: IDeal) => new DealsDto(deal));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('advertising-provider/confirmed')
    public async getAdvertisingProviderConfirmedDeals(@User() { userId }: { userId: number }): Promise<DealsDto[]> {
        const deals: IDeal[] = await this.dealsService.getAdvertisingProviderConfirmedDeals(userId);
        return deals.map((deal: IDeal) => new DealsDto(deal));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('advertising-provider/rejected')
    public async getAdvertisingProviderRejectedDeals(@User() { userId }: { userId: number }): Promise<DealsDto[]> {
        const deals: IDeal[] = await this.dealsService.getAdvertisingProviderRejectedDeals(userId);
        return deals.map((deal: IDeal) => new DealsDto(deal));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('channel-owner/pending')
    public async getChannelOwnerPendingDeals(@User() { userId }: { userId: number }): Promise<DealsDto[]> {
        const deals: IDeal[] = await this.dealsService.getChannelOwnerPendingDeals(userId);
        return deals.map((deal: IDeal) => new DealsDto(deal));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('channel-owner/confirmed')
    public async getChannelOwnerConfirmedDeals(@User() { userId }: { userId: number }): Promise<DealsDto[]> {
        const deals: IDeal[] = await this.dealsService.getChannelOwnerConfirmedDeals(userId);
        return deals.map((deal: IDeal) => new DealsDto(deal));
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('channel-owner/rejected')
    public async getChannelOwnerRejectedDeals(@User() { userId }: { userId: number }): Promise<DealsDto[]> {
        const deals: IDeal[] = await this.dealsService.getChannelOwnerRejectedDeals(userId);
        return deals.map((deal: IDeal) => new DealsDto(deal));
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    public async create(@User() { userId }: { userId: number }, @Body(ValidationPipe) dto: CreateDealsDto): Promise<DealsDto> {
        const deal: IDeal = await this.dealsService.create(userId, dto);
        return new DealsDto(deal);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/confirm')
    public async confirmDeal(@Param() param): Promise<DealsDto> {
        const deal: IDeal = await this.dealsService.confirmDeal(param.id);
        return new DealsDto(deal);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('/:id/reject')
    public async rejectDeal(@Param() param): Promise<DealsDto> {
        const deal: IDeal = await this.dealsService.rejectDeal(param.id);
        return new DealsDto(deal);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    public async remove(@Param() param): Promise<void> {
        await this.dealsService.remove(param.id);
    }

}
