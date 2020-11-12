import { IAuthTelegramService } from './interfaces/iauth-telegram.service';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
    ADVERTISING_PROVIDERS_REPOSITORY,
    AUTH_VALIDATOR_SERVICE,
    CHANNEL_OWNERS_REPOSITORY,
    TELEGRAM_USERS_MAPPER,
    TELEGRAM_USERS_REPOSITORY,
} from '../common/di.constants';
import { ITelegramUsersRepository } from '../telegram-users/interfaces/itelegram-users.repository';
import { ITelegramUsersMapper } from '../telegram-users/interfaces/itelegram-users.mapper';
import { TelegramUserDto } from '../telegram-users/dto/telegram-user.dto';
import { IUser } from '../users/interfaces/iuser';
import { AuthValidatorService } from './auth-validator.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthTelegramSignInDto } from './dto/auth-telegram-sign-in.dto';
import { AuthTelegramSignUpDto } from './dto/auth-telegram-sign-up.dto';
import { EUser } from '../users/enums/user.enum';
import { IAdvertisingProvidersRepository } from '../advertising-providers/interfaces/iadvertising-providers.repository';
import { IChannelOwnersRepository } from '../channel-owners/interfaces/ichannel-ownerss.repository';

@Injectable()
export class AuthTelegramService implements IAuthTelegramService {
    constructor(
        @Inject(TELEGRAM_USERS_REPOSITORY) private telegramUsersRepository: ITelegramUsersRepository,
        @Inject(AUTH_VALIDATOR_SERVICE) private authValidatorService: AuthValidatorService,
        @Inject(TELEGRAM_USERS_MAPPER) private telegramUsersMapper: ITelegramUsersMapper,
        @Inject(ADVERTISING_PROVIDERS_REPOSITORY) private advertisingProvidersRepository: IAdvertisingProvidersRepository,
        @Inject(CHANNEL_OWNERS_REPOSITORY) private channelOwnersRepository: IChannelOwnersRepository,
        private jwtService: JwtService
    ) {
    }
    public signIn = async (authCredentialDto: AuthTelegramSignInDto): Promise<AuthSignInDto> => {
        const user: Partial<IUser> = await this.telegramUsersRepository.findByTelegramId(authCredentialDto.telegramId);
        this.authValidatorService.checkIfUserExists(user);
        const userDto: TelegramUserDto = this.telegramUsersMapper.mapToDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.getUserTypeByUserId(userDto.id);
        return { user: userDto, accessToken, userType };
    }

    public  signUp = async(authCredentialDto: AuthTelegramSignUpDto): Promise<AuthSignInDto> => {
        const CONFLICT_PROPERTY_PHONE = 'phone';
        this.authValidatorService.checkUserIfTypeValid(authCredentialDto.userType);
        const telegramUser: Partial<IUser> = await this.telegramUsersRepository.findByPhone(authCredentialDto.phone);
        this.authValidatorService.checkIfUserAlreadySignedUp(telegramUser, CONFLICT_PROPERTY_PHONE);
        const user: Partial<IUser> = await this.telegramUsersRepository.create(authCredentialDto);
        const userDto: TelegramUserDto = this.telegramUsersMapper.mapToDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.createAdvertisingProviderOrChannelOwner(userDto.id, authCredentialDto.userType);
        return { user: userDto, accessToken, userType };
    }

    private createAdvertisingProviderOrChannelOwner = async (UserId: number, userType: string): Promise<EUser> => {
        if (userType === EUser.advertisingProvider) {
             await this.advertisingProvidersRepository.create({UserId});
             return EUser.advertisingProvider;
        }
        await this.channelOwnersRepository.create({UserId});
        return EUser.channelOwner;
    }

    private getUserTypeByUserId = async (UserId): Promise<EUser> => {
        const advertisingProvider = await this.advertisingProvidersRepository.findByUserId(UserId);
        if (advertisingProvider) {
            return EUser.advertisingProvider;
        }
        const channelOwner = await this.channelOwnersRepository.findByUserId(UserId);
        if (!channelOwner) {
            throw new HttpException('User has no type!', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return  EUser.channelOwner;
    }

}
