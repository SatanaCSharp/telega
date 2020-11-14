import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IUser } from '../users/interfaces/iuser';
import { AuthValidatorService } from './auth-validator.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthTelegramSignInDto } from './dto/auth-telegram-sign-in.dto';
import { AuthTelegramSignUpDto } from './dto/auth-telegram-sign-up.dto';
import { EUser } from '../users/enums/user.enum';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { UserTelegramDto } from '../users/dto/user-telegram.dto';
import { AdvertisingProvider } from '../advertising-providers/advertising-providers.model';
import { ChannelOwner } from '../channel-owners/channel-owners.model';

@Injectable()
export class AuthTelegramService {
    constructor(
        @InjectModel(User) private userModel: typeof User,
        @InjectModel(AdvertisingProvider) private advertisingProviderModel: typeof AdvertisingProvider,
        @InjectModel(ChannelOwner) private channelOwnerModel: typeof ChannelOwner,
        @Inject(AuthValidatorService) private authValidatorService: AuthValidatorService,
        private jwtService: JwtService,
    ) {
    }

    public signIn = async (authCredentialDto: AuthTelegramSignInDto): Promise<AuthSignInDto> => {
        const user: Partial<IUser> = await this.userModel.findOne({ where: { telegramId: authCredentialDto.telegramId } });
        this.authValidatorService.checkIfUserExists(user);
        const userDto: UserTelegramDto = new UserTelegramDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.getUserTypeByUserId(userDto.id);
        return { user: userDto, accessToken, userType };
    };

    public signUp = async (authCredentialDto: AuthTelegramSignUpDto): Promise<AuthSignInDto> => {
        const CONFLICT_PROPERTY_PHONE = 'phone';
        this.authValidatorService.checkUserIfTypeValid(authCredentialDto.userType);
        const telegramUser: Partial<IUser> = await this.userModel.findOne({ where: { phone: authCredentialDto.phone } });
        this.authValidatorService.checkIfUserAlreadySignedUp(telegramUser, CONFLICT_PROPERTY_PHONE);
        const user: Partial<IUser> = await this.userModel.create(authCredentialDto);
        const userDto: UserTelegramDto = new UserTelegramDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.createAdvertisingProviderOrChannelOwner(userDto.id, authCredentialDto.userType);
        return { user: userDto, accessToken, userType };
    };

    private createAdvertisingProviderOrChannelOwner = async (UserId: number, userType: string): Promise<EUser> => {
        if (userType === EUser.advertisingProvider) {
            await this.advertisingProviderModel.create({ UserId });
            return EUser.advertisingProvider;
        }
        await this.channelOwnerModel.create({ UserId });
        return EUser.channelOwner;
    };

    private getUserTypeByUserId = async (UserId): Promise<EUser> => {
        const advertisingProvider = await this.advertisingProviderModel.findOne({ where: { UserId } });
        if (advertisingProvider) {
            return EUser.advertisingProvider;
        }
        const channelOwner = await this.channelOwnerModel.findOne({ where: { UserId } });
        if (!channelOwner) {
            throw new HttpException('User has no type!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return EUser.channelOwner;
    };

}
