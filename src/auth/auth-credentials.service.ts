import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUsersRepository } from '../users/interfaces/iusers.repository';
import * as bcrypt from 'bcryptjs';
import { IUsersMapper } from '../users/interfaces/iusers.mapper';
import { UserDto } from '../users/dto/user.dto';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthCredentialsDto } from './dto/auth-creadential.dto';
import { IUser } from '../users/interfaces/iuser';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { AuthValidatorService } from './auth-validator.service';
import {
    ADVERTISING_PROVIDERS_REPOSITORY,
    AUTH_VALIDATOR_SERVICE,
    CHANNEL_OWNERS_REPOSITORY,
    TELEGRAM_USERS_REPOSITORY,
    USERS_MAPPER,
    USERS_REPOSITORY,
} from '../common/di.constants';
import { IAuthCredentialsService } from './interfaces/iauth-credentials.service';
import { ITelegramUsersRepository } from '../telegram-users/interfaces/itelegram-users.repository';
import { EUser } from '../users/enums/user.enum';
import { IAdvertisingProvidersRepository } from '../advertising-providers/interfaces/iadvertising-providers.repository';
import { IChannelOwnersRepository } from '../channel-owners/interfaces/ichannel-ownerss.repository';

@Injectable() export class AuthCredentialsService  implements  IAuthCredentialsService {
    constructor(
        @Inject(USERS_REPOSITORY) private usersRepository: IUsersRepository,
        @Inject(TELEGRAM_USERS_REPOSITORY) private telegramUsersRepository: ITelegramUsersRepository,
        @Inject(USERS_MAPPER) private usersMapper: IUsersMapper,
        @Inject(AUTH_VALIDATOR_SERVICE) private authValidatorService: AuthValidatorService,
        @Inject(ADVERTISING_PROVIDERS_REPOSITORY) private advertisingProvidersRepository: IAdvertisingProvidersRepository,
        @Inject(CHANNEL_OWNERS_REPOSITORY) private channelOwnersRepository: IChannelOwnersRepository,
        private jwtService: JwtService
    ) {}
    public signIn = async (authCredentialDto: AuthCredentialsDto): Promise<AuthSignInDto> => {
        const user: IUser = await this.usersRepository.findByEmail(authCredentialDto.email);
        await this.authValidatorService.validatePassword(user, authCredentialDto.password);
        const userDto: UserDto = this.usersMapper.mapToDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        const userType: EUser = await this.getUserTypeByUserId(userDto.id);
        return { user: userDto, accessToken, userType };
    };

    public signUp = async (authCredentialDto: AuthSignUpDto): Promise<AuthSignInDto> => {
        const CONFLICT_PROPERTY_EMAIL = 'email';
        const CONFLICT_PROPERTY_PHONE = 'phone';
        this.authValidatorService.checkUserIfTypeValid(authCredentialDto.userType);
        const telegramUser: Partial<IUser> = await this.telegramUsersRepository.findByPhone(authCredentialDto.phone);
        this.authValidatorService.checkIfUserAlreadySignedUp(telegramUser, CONFLICT_PROPERTY_PHONE);
        const user: IUser = await this.usersRepository.findByEmail(authCredentialDto.email);
        this.authValidatorService.checkIfUserAlreadySignedUp(user, CONFLICT_PROPERTY_EMAIL);
        const SALT_LENGTH = 10;
        const salt = await bcrypt.genSalt(SALT_LENGTH);
        const password =  await bcrypt.hash(authCredentialDto.password, salt);
        const createdUser: IUser = await this.usersRepository.create({...authCredentialDto, password});
        const userDto: UserDto = this.usersMapper.mapToDto(createdUser);
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
