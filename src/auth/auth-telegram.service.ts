import { IAuthTelegramService } from './interfaces/iauth-telegram.service';
import { Inject, Injectable } from '@nestjs/common';
import { AUTH_VALIDATOR_SERVICE, TELEGRAM_USERS_MAPPER, TELEGRAM_USERS_REPOSITORY } from '../common/di.constants';
import { ITelegramUsersRepository } from '../telegram-users/interfaces/itelegram-users.repository';
import { TelegramUsersMapper } from '../telegram-users/telegram-users.mapper';
import { ITelegramUsersMapper } from '../telegram-users/interfaces/itelegram-users.mapper';
import { CreateTelegramUserDto } from '../telegram-users/dto/create-telegram-user.dto';
import { TelegramUserDto } from '../telegram-users/dto/telegram-user.dto';
import { IUser } from '../users/interfaces/iuser';
import { AuthValidatorService } from './auth-validator.service';
import { JwtService } from '@nestjs/jwt';
import { AuthSignInDto } from './dto/auth-sign-in.dto';

@Injectable()
export class AuthTelegramService implements IAuthTelegramService {
    constructor(
        @Inject(TELEGRAM_USERS_REPOSITORY) private telegramUsersRepository: ITelegramUsersRepository,
        @Inject(AUTH_VALIDATOR_SERVICE) private authValidatorService: AuthValidatorService,
        @Inject(TELEGRAM_USERS_MAPPER) private telegramUsersMapper: ITelegramUsersMapper,
        private jwtService: JwtService
    ) {
    }
    public signIn = async (telegramId: number): Promise<AuthSignInDto> => {
        const user: Partial<IUser> = await this.telegramUsersRepository.findByTelegramId(telegramId);
        this.authValidatorService.checkIfUserExists(user);
        const userDto: TelegramUserDto = this.telegramUsersMapper.mapToDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        return { user: userDto, accessToken };
    }

    public  signUp = async(authCredentialDto: CreateTelegramUserDto): Promise<AuthSignInDto> => {
        const CONFLICT_PROPERTY_PHONE = 'phone';
        const telegramUser: Partial<IUser> = await this.telegramUsersRepository.findByPhone(authCredentialDto.phone);
        this.authValidatorService.checkIfUserAlreadySignedUp(telegramUser, CONFLICT_PROPERTY_PHONE);
        const user: Partial<IUser> = await this.telegramUsersRepository.create(authCredentialDto);
        const userDto: TelegramUserDto = this.telegramUsersMapper.mapToDto(user);
        const payload = { id: userDto.id };
        const accessToken = await this.jwtService.sign(payload);
        return { user: userDto, accessToken };
    }

}
